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
import { useUser, User, NavigateState } from '../hooks/GlobalState';
// import useSupabase from '../hooks/Supabase';

const SignInPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [state, setState] = useSetState({ loading: false, message: '' });
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const location = useLocation() as NavigateState;
  // const supabase = useSupabase();

  const signIn = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      setState({ loading: true });
      /*
      const { user } = await supabase.auth.signIn(credentials);
      if (user) {
        setUser(new User(user.id, user.user_metadata.nickname as string));
        const path = location.state?.from?.pathname || '/';
        navigate(path, { replace: true });
        showNotification({ message: 'Successful sign in.' });
      } else {
        setState({ message: 'Email or password is incorrect.' });
      }
      */
      console.log(credentials);
      setUser(new User('dummy', 'Haruka'));
      const path = location.state?.from?.pathname || '/';
      navigate(path, { replace: true });
      showNotification({ message: 'Successful sign in.' });
    } finally {
      setState({ loading: false });
    }
  };

  const close = () => navigate('/');

  return (
    <Modal opened onClose={close} title="Sign in" centered>
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(signIn)}>
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
