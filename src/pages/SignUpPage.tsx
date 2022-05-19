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
import { NavigateState } from '../hooks/GlobalState';
import useSupabase from '../hooks/Supabase';

const SignUpPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation() as NavigateState;
  const supabase = useSupabase();

  const signUp = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    const { user } = await supabase.auth.signUp(credentials);
    if (user) {
      const prev = location.state?.from || undefined;
      navigate('/signin', { state: { from: prev }, replace: true });
    } else {
      setMessage('Email or password is incorrect.');
    }
    setLoading(false);
  };

  const close = () => navigate('/');

  return (
    <Modal opened onClose={close} title="Sing up">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(signUp)}>
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
            Already have an account?{' '}
            <Anchor component={Link} to="/signin" size="xs">
              Sign in
            </Anchor>
          </Text>
          <Button type="submit" size="sm">
            Sign up
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default SignUpPage;
