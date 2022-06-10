import {
  ActionIcon,
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Text,
} from '@mantine/core';
import { useDebouncedValue, useSetState } from '@mantine/hooks';
import { X } from 'tabler-icons-react';

import { useFindProfilesQuery } from '../generated/graphql';
import useGraphQLClient from '../hooks/GraphQLClient';

type Props = {
  opened: boolean;
  onClose: () => void;
  targetGroup: { id: number; name: string };
  initialMembers: { id: string; nickname: string }[];
};

const ChangeMembersModal = ({
  opened,
  onClose,
  targetGroup,
  initialMembers,
}: Props) => {
  const [state, setState] = useSetState({
    message: '',
    loading: false,
    userName: '',
    members: initialMembers,
  });

  console.log(initialMembers);
  console.log(state.members);

  const members = state.members.map((member) => (
    <Badge
      key={member.id}
      py="md"
      size="lg"
      radius="sm"
      style={{ textTransform: 'none' }}
      color="gray"
    >
      <Group spacing="xs">
        {member.nickname}
        <ActionIcon
          color="gray"
          size="sm"
          radius="lg"
          variant="filled"
          onClick={() =>
            setState({
              members: state.members.filter((m) => m.id !== member.id),
            })
          }
        >
          <X />
        </ActionIcon>
      </Group>
    </Badge>
  ));

  const [debouncedUserName] = useDebouncedValue(state.userName, 500);

  const graphQLClient = useGraphQLClient();

  const { data: findProfilesQuery } = useFindProfilesQuery(
    graphQLClient,
    {
      first: 20,
      likeName: `${debouncedUserName}%`,
    },
    {
      enabled: debouncedUserName.trim().length > 0,
    }
  );

  const result =
    findProfilesQuery?.profilesCollection?.edges.map((profileEdge) => {
      const profile = profileEdge.node;
      return { label: profile?.nickname ?? '', value: profile?.id ?? '' };
    }) ?? [];

  const submit = () => {
    try {
      setState({ loading: true });

      console.log(state.members);
      /*
      await addGroupMutation.mutateAsync(
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
      */

      onClose();
    } finally {
      setState({ loading: false });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Change members">
      <LoadingOverlay visible={state.loading} />
      <Text color="red" size="sm">
        {state.message}
      </Text>
      <Text color="dimmed" mt="md" size="sm">
        Group
      </Text>
      <Text>{targetGroup?.name}</Text>
      <Text color="dimmed" mt="md" size="sm">
        Members
      </Text>
      <Group>
        <Select
          label="Select user to be added to the group."
          placeholder="Type a user name to search"
          data={result}
          searchable
          nothingFound="No users"
          onSearchChange={(value) => {
            setState({ userName: value });
          }}
          onChange={(value) => {
            const member = result.find((m) => m.value === value);
            if (member === undefined) return;
            state.members.concat(...state.members, {
              id: member?.value,
              nickname: member?.label,
            });
            setState({ userName: '' });
          }}
        />
      </Group>
      <Group mt="md" spacing="sm">
        {members}
      </Group>
      <Group position="right" mt="md">
        <Button type="submit" size="sm" onClick={submit}>
          Save
        </Button>
      </Group>
    </Modal>
  );
};

export default ChangeMembersModal;
