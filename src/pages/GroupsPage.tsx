import {
  Badge,
  Button,
  Group,
  Menu,
  MenuItem,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { Suspense } from 'react';

import { useFindGroupsQuery } from '../generated/graphql';
import useGraphQLClient from '../hooks/GraphQLClient';
import useIsMobile from '../hooks/Mobile';
import { useUser } from '../hooks/User';
import GroupAddModal from './GroupAddModal';
import Loading from './Loading';

const Groups = () => {
  const isMobile = useIsMobile();
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();

  const { data } = useFindGroupsQuery(graphQLClient, { userId: user.id });

  const rows = data?.membersCollection?.edges.map((memberEdge) => {
    const group = memberEdge.node?.groups;
    return (
      <tr key={group?.id}>
        {isMobile ? (
          <td>
            <Group position="apart">
              <Text>{group?.name}</Text>
              <Menu>
                <MenuItem>Edit group</MenuItem>
                <MenuItem>Delete group</MenuItem>
              </Menu>
            </Group>
            <Group mt="md">
              {group?.membersCollection?.edges.map((groupMemberEdge) => {
                const profile = groupMemberEdge.node?.profiles;
                return (
                  <Badge key={profile?.id} style={{ textTransform: 'none' }}>
                    {profile?.nickname}
                  </Badge>
                );
              })}
            </Group>
            <Group position="right">
              <Button mt="md">Change members</Button>
            </Group>
          </td>
        ) : (
          <>
            <td>
              <Text>{group?.name}</Text>
            </td>
            <td>
              <Group>
                {group?.membersCollection?.edges.map((groupMemberEdge) => {
                  const profile = groupMemberEdge.node?.profiles;
                  return (
                    <Badge key={profile?.id} style={{ textTransform: 'none' }}>
                      {profile?.nickname}
                    </Badge>
                  );
                })}
              </Group>
            </td>
            <td>
              <Button>Change members</Button>
            </td>
            <td>
              <Menu>
                <MenuItem>Edit group</MenuItem>
                <MenuItem>Delete group</MenuItem>
              </Menu>
            </td>
          </>
        )}
      </tr>
    );
  });

  return (
    <Table verticalSpacing="xl" striped highlightOnHover>
      {isMobile ? (
        <tbody>{rows}</tbody>
      ) : (
        <>
          <thead>
            <tr>
              <th style={{ width: '200px' }}>Name</th>
              <th>Members</th>
              <th>Action</th>
              <th>More</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </>
      )}
    </Table>
  );
};

const GroupsPage = () => {
  const [state, setState] = useSetState({ addOpened: false });

  return (
    <>
      <Group position="apart">
        <Title order={3}>Gropus</Title>
        <Button onClick={() => setState({ addOpened: true })}>New group</Button>
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
