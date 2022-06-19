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
import { useForm } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';
import { useConfig } from '../hooks/Config';

const SignUpPage = () => {
  const config = useConfig();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? t('password.notMatch.message') : null,
    },
  });

  const [state, setState] = useSetState({ loading: false, messaage: '' });
  const navigate = useNavigate();

  const auth = useAuth();

  const submit = async (values: typeof form.values): Promise<void> => {
    try {
      setState({ loading: true });

      const error = await auth.signUp(values);
      if (error) {
        setState({ messaage: error.message });
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
      <form onSubmit={form.onSubmit(submit)}>
        <Text color="red" size="sm">
          {state.messaage}
        </Text>
        <TextInput
          required
          type="text"
          label={t('nickname')}
          placeholder={t('nickname.placeholder')}
          {...form.getInputProps('nickname')}
          description={t('nickname.description')}
        />
        <TextInput
          mt="md"
          required
          type="email"
          label={t('email')}
          placeholder={t('email.placeholder')}
          {...form.getInputProps('email')}
          description={t('email.description')}
          autoComplete="email"
        />
        <Text color="dimmed" size="xs">
          {t('email.signUp.message')}
        </Text>
        <PasswordInput
          mt="md"
          required
          label={t('password')}
          placeholder={t('password.placeholder')}
          {...form.getInputProps('password')}
          autoComplete="new-password"
        />
        <PasswordInput
          mt="md"
          required
          label={t('password.confirm')}
          placeholder={t('password.confirm.placeholder')}
          {...form.getInputProps('confirmPassword')}
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
