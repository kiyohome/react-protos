import { Anchor, Group, LoadingOverlay, Text, Title } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { Suspense } from 'react';
import { useGetGroupsQuery } from '../generated/graphql';
import { useGraphQLClient } from '../hooks/GlobalState';
import GroupAddModal from './GroupAddModal';

const Groups = () => {
  const client = useGraphQLClient();
  const { data } = useGetGroupsQuery(client);
  console.log(data);
  return <Text>GROUPLIST</Text>;
};

const GroupsPage = () => {
  const [state, setState] = useSetState({ addOpened: false });
  return (
    <>
      <Group position="apart">
        <Title order={3}>Gropus</Title>
        <Anchor onClick={() => setState({ addOpened: true })}>Add</Anchor>
      </Group>
      <Text>Here comes your groups.</Text>
      <Suspense fallback={<LoadingOverlay visible />}>
        <Groups />
      </Suspense>
      <GroupAddModal
        opened={state.addOpened}
        onClose={() => setState({ addOpened: false })}
      />
    </>
  );
};

export default GroupsPage;
