import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocation, useNavigate } from 'react-router-dom';
import useUser from '../hooks/GlobalState';
import User from '../models/User';

const LoginPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [user, setUser] = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const login = form.onSubmit(({ email, password }) => {
    // TODO invoke backend API
    // TODO handle authentication error
    setUser(new User('dummy', 'Haruka Ayase'));
    const fromPath = '/'; // TODO set path before login
    navigate(fromPath, { replace: true });
  });

  const close = () => navigate('/');

  return (
    <Modal opened onClose={close} title="Login">
      <form onSubmit={login}>
        <TextInput
          required
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
