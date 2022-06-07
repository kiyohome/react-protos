import { Anchor, Group, Table, Title } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

import { useFindGroupsQuery } from '../generated/graphql';
import useGraphQLClient from '../hooks/GraphQLClient';
import { useUser } from '../hooks/User';
import GroupAddModal from './GroupAddModal';
import Loading from './Loading';

const Groups = () => {
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();

  const { data } = useFindGroupsQuery(graphQLClient, { userId: user.id });

  const rows = data?.membersCollection?.edges.map((memberEdge) => {
    const group = memberEdge.node?.groups;
    return (
      <tr key={group?.id}>
        <td>
          <Anchor
            component={Link}
            to={`/groups/${group?.id ?? ''}`}
            underline={false}
          >
            {group?.name}
          </Anchor>
        </td>
        <td>
          {group?.membersCollection?.edges.map((groupMemberEdge) => {
            const profile = groupMemberEdge.node?.profiles;
            return <div key={profile?.id}>{profile?.nickname}</div>;
          })}
        </td>
      </tr>
    );
  });

  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Members</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

const GroupsPage = () => {
  const [state, setState] = useSetState({ addOpened: false });

  return (
    <>
      <Group>
        <Title order={3}>Gropus</Title>
      </Group>
      <Group mt="md">
        <Anchor onClick={() => setState({ addOpened: true })}>Add</Anchor>
      </Group>
      <Suspense fallback={<Loading />}>
        <Group mt="md">
          <Groups />
        </Group>
      </Suspense>
      <GroupAddModal
        opened={state.addOpened}
        onClose={() => setState({ addOpened: false })}
      />
    </>
  );
};

export default GroupsPage;
