import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser, User, NavigateState } from '../hooks/GlobalState';

const LoginPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });
  const [error, setError] = useState('');
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const location = useLocation() as NavigateState;
  const login = form.onSubmit(({ email, password }) => {
    // TODO invoke backend API
    const isOK = password === 'pass';
    if (isOK) {
      setUser(new User('dummy', 'Haruka Ayase'));
      const path = location.state?.from?.pathname || '/';
      navigate(path, { replace: true });
    } else {
      setError('Email or password is incorrect.');
    }
  });
  const close = () => navigate('/');

  return (
    <Modal opened onClose={close} title="Login">
      <form onSubmit={login}>
        <Text color="red" size="sm">
          {error}
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
            Don't have an account? Register
          </Text>
          <Button type="submit" size="sm">
            Login
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default LoginPage;
