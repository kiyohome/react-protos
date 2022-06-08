import {
  Button,
  Group,
  Highlight,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from 'react-query';

import { useRemoveGroupMutation } from '../generated/graphql';
import useGraphQLClient from '../hooks/GraphQLClient';
import { useUser } from '../hooks/User';

type Props = {
  opened: boolean;
  onClose: () => void;
  group: { id: number; name: string };
};

const RemoveGroupModal = ({ opened, onClose, group }: Props) => {
  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const [state, setState] = useSetState({ message: '', loading: false });

  const graphQLClient = useGraphQLClient();
  const mutation = useRemoveGroupMutation(graphQLClient);
  const queryClient = useQueryClient();
  const [user] = useUser();

  const submit = async () => {
    try {
      setState({ loading: true });

      await mutation.mutateAsync(
        { groupId: group.id },
        {
          onSuccess: async () => {
            showNotification({ message: 'Removed a group.' });
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
    <Modal opened={opened} onClose={onClose} title="Remove a group" centered>
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(submit)}>
        <Text color="red" size="sm">
          {state.message}
        </Text>
        <Highlight highlight={[group.name]}>
          {`Are you sure you want to remove the group "${group.name}". If you want to delete the group, please enter the name of the group.`}
        </Highlight>
        <TextInput
          mt="md"
          required
          type="text"
          label="Name"
          placeholder="Group name"
          {...form.getInputProps('name')}
        />
        <Group position="right" mt="md">
          <Button
            type="submit"
            size="sm"
            disabled={group.name !== form.values.name}
          >
            Remove
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default RemoveGroupModal;
