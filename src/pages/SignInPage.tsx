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
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';
import { NavigateState } from '../hooks/NavigateState';
import { User, useUser } from '../hooks/User';

const SignInPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [state, setState] = useSetState({ loading: false, message: '' });
  const navigate = useNavigate();
  const location = useLocation() as NavigateState;
  const auth = useAuth();

  const [, setUser] = useUser();

  const submit = async (values: typeof form.values): Promise<void> => {
    try {
      setState({ loading: true });

      const isSuccess = await auth.signIn(values);
      if (isSuccess) {
        const profile = await auth.profile();
        setUser(new User(profile.id, profile.nickname, profile.avatar_url));
        const path = location.state?.from?.pathname || '/';
        navigate(path, { replace: true });
        showNotification({ message: 'Signed in.' });
      } else {
        setState({ message: 'Email or password is incorrect.' });
      }
    } finally {
      setState({ loading: false });
    }
  };

  const close = () => navigate('/');

  return (
    <Modal opened onClose={close} title="Sign in">
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(submit)}>
        <Text color="red" size="sm">
          {state.message}
        </Text>
        <TextInput
          required
          type="email"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          autoComplete="email"
        />
        <PasswordInput
          mt="md"
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
          autoComplete="current-password"
        />
        <Group position="apart" mt="md">
          <Text color="dimmed" size="xs">
            Don&apos;t have an account?{' '}
            <Anchor component={Link} to="/signup" size="xs">
              Sign up
            </Anchor>
          </Text>
          <Button type="submit" size="sm">
            Sign in
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default SignInPage;
