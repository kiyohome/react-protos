import {
  Anchor,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '../hooks/Auth';
import { useConfig } from '../hooks/Config';
import useValidation from '../hooks/Validation';

const SignUpPage = () => {
  const config = useConfig();
  const { t } = useTranslation();

  const { rules } = useValidation();
  const schema = z.object({
    nickname: rules.nickname.min(1),
    email: rules.email.min(1),
    password: rules.password.min(1),
    confirmPassword: rules.password.min(1),
  });

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [state, setState] = useSetState({ loading: false, message: '' });
  const navigate = useNavigate();

  const auth = useAuth();

  const submit = async (values: typeof form.values): Promise<void> => {
    if (values.password !== values.confirmPassword) {
      form.setFieldError('confirmPassword', t('password.notMatch.message'));
      return;
    }

    try {
      setState({ loading: true });

      const error = await auth.signUp(values);
      if (error) {
        setState({ message: error.message });
      } else {
        navigate('/signin', { replace: true });
        showNotification({ message: t('signUp.done.message') });
      }
    } finally {
      setState({ loading: false });
    }
  };

  const close = () => navigate('/');

  return (
    <Modal
      opened
      onClose={close}
      title="Sing up"
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(submit)} noValidate>
        <Text color="red" size="sm">
          {state.message}
        </Text>
        <TextInput
          required
          type="text"
          label={t('nickname')}
          {...form.getInputProps('nickname')}
          description={t('nickname.description')}
        />
        <Text mt={5} color="dimmed" size="xs" style={{ lineHeight: 1.2 }}>
          {t('nickname.signUp.message')}
        </Text>
        <TextInput
          mt="md"
          required
          type="email"
          label={t('email')}
          {...form.getInputProps('email')}
          description={t('email.description')}
          autoComplete="email"
        />
        <Text mt={5} color="dimmed" size="xs" style={{ lineHeight: 1.2 }}>
          {t('email.signUp.message')}
        </Text>
        <PasswordInput
          mt="md"
          required
          label={t('password')}
          {...form.getInputProps('password')}
          description={t('password.description')}
          autoComplete="new-password"
        />
        <PasswordInput
          mt="md"
          required
          label={t('password.confirm')}
          {...form.getInputProps('confirmPassword')}
          description={t('password.description')}
          autoComplete="new-password"
        />
        <Group position="apart" mt="md">
          <Text color="dimmed" size="xs">
            {t('signUp.signIn.message')}{' '}
            <Anchor component={Link} to="/signin" size="xs">
              {t('signIn')}
            </Anchor>
          </Text>
          <Button type="submit" size="sm">
            {t('signUp')}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default SignUpPage;
