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
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser, User, NavigateState } from '../hooks/GlobalState';
import useSupabase from '../hooks/Supabase';

const SignInPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const location = useLocation() as NavigateState;
  const supabase = useSupabase();

  const signIn = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    const { user } = await supabase.auth.signIn(credentials);
    if (user) {
      setUser(new User(user?.id, user?.email));
      const path = location.state?.from?.pathname || '/';
      navigate(path, { replace: true });
    } else {
      setMessage('Email or password is incorrect.');
    }
    setLoading(false);
  };

  const close = () => navigate('/');

  return (
    <Modal opened onClose={close} title="Sign in">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(signIn)}>
        <Text color="red" size="sm">
          {message}
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
          id="current-password"
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
