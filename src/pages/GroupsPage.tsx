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
import AddGroupModal from './AddGroupModal';
import Loading from './Loading';
import RemoveGroupModal from './RemoveGroupModal';

type GroupsProps = {
  setGroup: (id: number, name: string) => void;
  openRemove: () => void;
};

const Groups = ({ setGroup, openRemove }: GroupsProps) => {
  const isMobile = useIsMobile();
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();

  const { data } = useFindGroupsQuery(graphQLClient, { userId: user.id });

  const rows = data?.membersCollection?.edges.map((memberEdge) => {
    const group = memberEdge.node?.groups;

    const groupName = <Text>{group?.name}</Text>;

    const isOwner = user.id === group?.profiles?.id;

    const menu = (
      <Menu>
        <MenuItem>Change members</MenuItem>
        <MenuItem>Edit group</MenuItem>
        <MenuItem
          disabled={!isOwner}
          onClick={() => {
            setGroup(group?.id, group?.name);
            openRemove();
          }}
        >
          Remove group
        </MenuItem>
      </Menu>
    );

    const owner = (
      <Badge size="lg" radius="sm" style={{ textTransform: 'none' }}>
        {group?.profiles?.nickname}
      </Badge>
    );

    const members = group?.membersCollection?.edges.map((groupMemberEdge) => {
      const profile = groupMemberEdge.node?.profiles;
      return (
        <Badge
          key={profile?.id}
          size="lg"
          radius="sm"
          style={{ textTransform: 'none' }}
        >
          {profile?.nickname}
        </Badge>
      );
    });

    return (
      <tr key={group?.id}>
        {isMobile ? (
          <td>
            <Group position="apart">
              {groupName}
              {menu}
            </Group>
            <Text color="dimmed">Members</Text>
            <Group mt="md" spacing="sm">
              {members}
            </Group>
            <Text color="dimmed">Owner</Text>
            <Group mt="md" spacing="sm">
              {owner}
            </Group>
          </td>
        ) : (
          <>
            <td>{groupName}</td>
            <td>
              <Group>{members}</Group>
            </td>
            <td>{owner}</td>
            <td>{menu}</td>
          </>
        )}
      </tr>
    );
  });

  return (
    <Table verticalSpacing="md">
      {isMobile ? (
        <tbody>{rows}</tbody>
      ) : (
        <>
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </>
      )}
    </Table>
  );
};

type GroupsState = {
  addOpened: boolean;
  removeOpened: boolean;
  group: { id: number; name: string };
};

const GroupsPage = () => {
  const [state, setState] = useSetState<GroupsState>({
    addOpened: false,
    removeOpened: false,
    group: { id: -1, name: '' },
  });

  return (
    <>
      <Group position="apart">
        <Title order={3}>Gropus</Title>
        <Button variant="light" onClick={() => setState({ addOpened: true })}>
          New Group
        </Button>
      </Group>
      <Suspense fallback={<Loading />}>
        <Group mt="md">
          <Groups
            setGroup={(id: number, name: string) => {
              setState({ group: { id, name } });
            }}
            openRemove={() => setState({ removeOpened: true })}
          />
        </Group>
      </Suspense>
      <AddGroupModal
        opened={state.addOpened}
        onClose={() => setState({ addOpened: false })}
      />
      <RemoveGroupModal
        opened={state.removeOpened}
        onClose={() => setState({ removeOpened: false })}
        group={state.group}
      />
    </>
  );
};

export default GroupsPage;
