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
import useNavigateState from '../hooks/NavigateState';
import { User, useUser } from '../hooks/User';
import useValidation from '../hooks/Validation';

const SignInPage = () => {
  const config = useConfig();
  const { t } = useTranslation();

  const { rules } = useValidation();
  const schema = z.object({
    email: rules.email.min(1),
    password: rules.password.min(1),
  });

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [state, setState] = useSetState({ loading: false, message: '' });
  const navigate = useNavigate();
  const { fromPath } = useNavigateState();
  const auth = useAuth();

  const [, setUser] = useUser();

  const submit = async (values: typeof form.values): Promise<void> => {
    try {
      setState({ loading: true });
      const isSuccess = await auth.signIn(values);
      if (isSuccess) {
        const profile = await auth.profile();
        setUser(new User(profile.id, profile.nickname, profile.avatar_url));
        navigate(fromPath || '/', { replace: true });
        showNotification({ message: t('signIn.done.message') });
      } else {
        setState({ message: t('signIn.failure.message') });
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
      title={t('signIn')}
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(submit)} noValidate>
        <Text color="red" size="sm">
          {state.message}
        </Text>
        <TextInput
          required
          type="email"
          label={t('email')}
          description={t('email.description')}
          {...form.getInputProps('email')}
          autoComplete="email"
        />
        <PasswordInput
          mt="md"
          required
          label={t('password')}
          description={t('password.description')}
          {...form.getInputProps('password')}
          autoComplete="current-password"
        />
        <Group position="apart" mt="md">
          <Text color="dimmed" size="xs">
            {t('signIn.signUp.message')}{' '}
            <Anchor component={Link} to="/signup" size="xs">
              {t('signUp')}
            </Anchor>
          </Text>
          <Button type="submit" size="sm">
            {t('signIn')}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default SignInPage;
