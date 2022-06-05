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
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

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

  const [state, setState] = useSetState({ loading: false, messaage: '' });
  const navigate = useNavigate();

  const auth = useAuth();

  const signUp = async (values: typeof form.values): Promise<void> => {
    try {
      setState({ loading: true });

      const error = await auth.signUp(values);
      if (error) {
        setState({ messaage: error.message });
      } else {
        navigate('/signin', { replace: true });
        showNotification({ message: 'Successful sign up.' });
      }
    } finally {
      setState({ loading: false });
    }
  };

  const close = () => navigate('/');

  return (
    <Modal opened onClose={close} title="Sing up" centered>
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(signUp)}>
        <Text color="red" size="sm">
          {state.messaage}
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
