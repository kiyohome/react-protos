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
import { Link, useNavigate } from 'react-router-dom';
import useSupabase from '../hooks/Supabase';

const SignUpPage = () => {
  const form = useForm({
    initialValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const supabase = useSupabase();

  const signUp = async (values: {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(
        {
          email: values.email,
          password: values.password,
        },
        {
          data: {
            nickname: values.nickname,
          },
        }
      );
      if (error) {
        setMessage(error.message);
      } else {
        navigate('/signin', { replace: true });
      }
    } finally {
      setLoading(false);
    }
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
          type="text"
          label="Nickname"
          placeholder="Nickname"
          {...form.getInputProps('nickname')}
          description="Nicknames must be unique across services. If you cannot sign up, please change your nickname."
        />
        <TextInput
          mt="md"
          required
          type="email"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          description="After signing up, please check your email for activation."
          autoComplete="email"
        />
        <PasswordInput
          mt="md"
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
          autoComplete="new-password"
        />
        <PasswordInput
          mt="md"
          required
          label="Confirm Password"
          placeholder="Confirm Password"
          {...form.getInputProps('confirmPassword')}
          autoComplete="new-password"
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
