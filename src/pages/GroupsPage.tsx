import { Anchor, Group, Text, Title } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import GroupAddModal from './GroupAddModal';

const GroupsPage = () => {
  const [state, setState] = useSetState({ addOpened: false });
  return (
    <>
      <Group position="apart">
        <Title order={3}>Gropus</Title>
        <Anchor onClick={() => setState({ addOpened: true })}>Add</Anchor>
      </Group>
      <Text>Here comes your groups.</Text>
      <GroupAddModal
        opened={state.addOpened}
        onClose={() => setState({ addOpened: false })}
      />
    </>
  );
};

export default GroupsPage;
