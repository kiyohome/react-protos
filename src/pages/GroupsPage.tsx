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
import ChangeMembersModal from './ChangeMembersModal';
import Loading from './Loading';
import RemoveGroupModal from './RemoveGroupModal';

type GroupsProps = {
  setGroup: (id: number, name: string) => void;
  setMembers: (members: { id: string; nickname: string }[]) => void;
  openChangeMembers: () => void;
  openRemove: () => void;
};

const Groups = ({
  setGroup,
  setMembers,
  openChangeMembers,
  openRemove,
}: GroupsProps) => {
  const isMobile = useIsMobile();
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();

  const { data: findGroupsQuery } = useFindGroupsQuery(graphQLClient, {
    userId: user.id,
  });

  const rows = findGroupsQuery?.membersCollection?.edges.map((memberEdge) => {
    const group = memberEdge.node?.groups;

    const groupName = <Text>{group?.name}</Text>;

    const isOwner = user.id === group?.profiles?.id;

    const memberValues =
      group?.membersCollection?.edges.map((m) => {
        const profile = m.node?.profiles;
        return { id: profile?.id ?? '', nickname: profile?.nickname ?? '' };
      }) ?? [];

    const menu = (
      <Menu>
        <MenuItem
          onClick={() => {
            if (group) {
              setGroup(group.id, group.name);
              setMembers(memberValues);
              openChangeMembers();
            }
          }}
        >
          Change members
        </MenuItem>
        <MenuItem>Edit group</MenuItem>
        <MenuItem
          onClick={() => {
            if (group) {
              setGroup(group.id, group.name);
              openRemove();
            }
          }}
        >
          Remove group
        </MenuItem>
      </Menu>
    );

    const owner = (
      <Badge
        size="lg"
        radius="sm"
        style={{ textTransform: 'none' }}
        color="gray"
      >
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
          color="gray"
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
            <Text mt="md" size="xs" color="dimmed">
              Members
            </Text>
            <Group spacing="sm">{members}</Group>
            <Text mt="md" size="xs" color="dimmed">
              Owner
            </Text>
            <Group>{owner}</Group>
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
  addGroupOpened: boolean;
  changeMembersOpened: boolean;
  removeGroupOpened: boolean;
  group: { id: number; name: string };
  members: { id: string; nickname: string }[];
};

const GroupsPage = () => {
  const [state, setState] = useSetState<GroupsState>({
    addGroupOpened: false,
    changeMembersOpened: false,
    removeGroupOpened: false,
    group: { id: -1, name: '' },
    members: [],
  });

  const clearState = () => {
    setState({
      addGroupOpened: false,
      changeMembersOpened: false,
      removeGroupOpened: false,
      group: { id: -1, name: '' },
      members: [],
    });
  };

  return (
    <>
      <Group position="apart">
        <Title order={3}>Gropus</Title>
        <Button
          variant="light"
          onClick={() => setState({ addGroupOpened: true })}
        >
          New Group
        </Button>
      </Group>
      <Suspense fallback={<Loading />}>
        <Group mt="md">
          <Groups
            setGroup={(id: number, name: string) => {
              setState({ group: { id, name } });
            }}
            setMembers={(members) => setState({ members })}
            openChangeMembers={() => setState({ changeMembersOpened: true })}
            openRemove={() => setState({ removeGroupOpened: true })}
          />
        </Group>
      </Suspense>
      <AddGroupModal opened={state.addGroupOpened} onClose={clearState} />
      <ChangeMembersModal
        opened={state.changeMembersOpened}
        onClose={clearState}
        targetGroup={state.group}
        initialMembers={state.members}
      />
      <RemoveGroupModal
        opened={state.removeGroupOpened}
        onClose={clearState}
        targetGroup={state.group}
      />
    </>
  );
};

export default GroupsPage;
