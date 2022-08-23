import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
  useChangeGroupMutation,
  useFindGroupsQuery,
} from '../../generated/graphql';
import { useConfig } from '../../hooks/Config';
import useGraphQLClient from '../../hooks/GraphQLClient';
import { useUser } from '../../hooks/User';
import useValidation from '../../hooks/Validation';

type FormProps = {
  groupId: number;
  setLoading: (loading: boolean) => void;
  close: () => void;
};

const ChangeGroupForm = ({ groupId, setLoading, close }: FormProps) => {
  const { t } = useTranslation();

  const [user] = useUser();
  const graphQLClient = useGraphQLClient();
  const { data: findGroupsQuery } = useFindGroupsQuery(graphQLClient, {
    userId: user.id,
  });

  const group = findGroupsQuery?.membersCollection?.edges.find(
    (me) => me.node?.groups?.id === groupId
  )?.node?.groups;

  const { rules } = useValidation();
  const schema = z.object({
    name: rules.groups.name.min(1),
    owner: rules.groups.owner.min(1),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: group?.name,
      owner: group?.profiles?.id,
    },
  });

  const searchResult =
    group?.membersCollection?.edges.map((memberEdge) => {
      const profile = memberEdge.node?.profiles;
      return { label: profile?.nickname ?? '', value: profile?.id ?? '' };
    }) ?? [];

  const queryClient = useQueryClient();
  const changeGroupMutation = useChangeGroupMutation(graphQLClient);

  const submit = async (values: typeof form.values) => {
    try {
      setLoading(true);

      const input = { ...values };

      const onSuccess = async () => {
        showNotification({ message: t('group.change.done.message') });
        await queryClient.invalidateQueries([
          'findGroups',
          { userId: user.id },
        ]);
      };

      await changeGroupMutation.mutateAsync({ groupId, input }, { onSuccess });

      close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(submit)} noValidate>
      <TextInput
        required
        type="text"
        label={t('name')}
        placeholder={t('group.name.placeholder')}
        {...form.getInputProps('name')}
      />
      <Select
        mt="md"
        required
        label={t('owner')}
        data={searchResult}
        {...form.getInputProps('owner')}
      />
      <Group position="right" mt="md">
        <Button type="submit" size="sm">
          {t('save')}
        </Button>
      </Group>
    </form>
  );
};

type ModalProps = {
  opened: boolean;
  close: () => void;
  groupId: number;
};

const ChangeGroupModal = ({ opened, close, groupId }: ModalProps) => {
  const config = useConfig();
  const { t } = useTranslation();

  const [state, setState] = useSetState({ loading: false });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={t('group.change')}
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <ChangeGroupForm
        groupId={groupId}
        setLoading={(loading) => setState({ loading })}
        close={close}
      />
    </Modal>
  );
};

export default ChangeGroupModal;
