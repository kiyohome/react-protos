import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from 'react-query';

import { useAddGroupMutation } from '../generated/graphql';
import useGraphQLClient from '../hooks/GraphQLClient';
import { useUser } from '../hooks/User';

type Props = {
  opened: boolean;
  onClose(): void;
};

const GroupAddModal = ({ opened, onClose }: Props) => {
  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const [state, setState] = useSetState({ message: '', loading: false });

  const graphQLClient = useGraphQLClient();
  const mutation = useAddGroupMutation(graphQLClient);
  const queryClient = useQueryClient();
  const [user] = useUser();

  const addGroup = async (values: typeof form.values) => {
    try {
      setState({ loading: true });

      await mutation.mutateAsync(
        { ...values, owner: user.id },
        {
          onSuccess: async () => {
            showNotification({ message: 'Added a new group.' });
            await queryClient.invalidateQueries([
              'findGroups',
              { userId: user.id },
            ]);
          },
        }
      );

      onClose();
    } finally {
      setState({ loading: false });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add a new group" centered>
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(addGroup)}>
        <Text color="red" size="sm">
          {state.message}
        </Text>
        <TextInput
          required
          type="text"
          label="Name"
          placeholder="Group name"
          {...form.getInputProps('name')}
        />
        <Group position="right" mt="md">
          <Button type="submit" size="sm">
            Add
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default GroupAddModal;
