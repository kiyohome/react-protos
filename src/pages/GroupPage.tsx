import { Anchor, Breadcrumbs, Group, Text, Title } from '@mantine/core';
import { Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFindGroupsQuery } from '../generated/graphql';
import useGraphQLClient from '../hooks/GraphQLClient';
import { useUser } from '../hooks/User';
import Loading from './Loading';

const GroupPage = () => {
  const [user] = useUser();
  const graphQLClient = useGraphQLClient();
  const { data } = useFindGroupsQuery(graphQLClient, { userId: user.id });

  const params = useParams();
  const memberEdge = data?.membersCollection?.edges.find(
    (m) => m.node?.groups?.id.toString() === params.groupId
  );
  const group = memberEdge?.node?.groups;

  return (
    <>
      <Breadcrumbs>
        {[
          <Anchor component={Link} to="/groups" key="/groups">
            Back
          </Anchor>,
        ]}
      </Breadcrumbs>
      <Suspense fallback={<Loading />}>
        <Group mt="md">
          <Title order={3}>Group</Title>
        </Group>
        <Group mt="md">
          <Text color="dimmed" size="sm">
            Name
          </Text>
          <Anchor size="sm">Edit</Anchor>
        </Group>
        <Text>{group?.name}</Text>
        <Group mt="md">
          <Text color="dimmed" size="sm">
            Members
          </Text>
          <Anchor size="sm">Edit</Anchor>
        </Group>
        {group?.membersCollection?.edges.map((groupMemberEdge) => {
          const profile = groupMemberEdge.node?.profiles;
          return <Text key={profile?.id}>{profile?.nickname}</Text>;
        })}
      </Suspense>
    </>
  );
};

export default GroupPage;
