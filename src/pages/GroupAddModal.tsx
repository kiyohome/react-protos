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

  const addGroup = async (values: { name: string }) => {
    try {
      setState({ loading: true });
      console.log(values);
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
