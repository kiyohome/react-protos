import {
  Button,
  Group,
  Highlight,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useFindGroupsQuery,
  useRemoveGroupMutation,
} from '../../generated/graphql';
import { useConfig } from '../../hooks/Config';
import useGraphQLClient from '../../hooks/GraphQLClient';
import { useUser } from '../../hooks/User';

type FromProps = {
  groupId: number;
  setLoading: (loading: boolean) => void;
  close: () => void;
};

const RemoveGroupForm = ({ groupId, setLoading, close }: FromProps) => {
  const config = useConfig();
  const { t } = useTranslation();

  const [user] = useUser();
  const graphQLClient = useGraphQLClient();
  const { data: findGroupsQuery } = useFindGroupsQuery(graphQLClient, {
    userId: user.id,
  });

  const group = findGroupsQuery?.membersCollection?.edges.find(
    (me) => me.node?.groups?.id === groupId
  )?.node?.groups;

  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const removeGroupMutation = useRemoveGroupMutation(graphQLClient);
  const queryClient = useQueryClient();

  const submit = async () => {
    try {
      setLoading(true);

      await removeGroupMutation.mutateAsync(
        {
          groupId,
          owner: user.id,
          atMost: config.atMost,
        },
        {
          onSuccess: async () => {
            form.reset();
            showNotification({ message: t('group.remove.done.message') });
            await queryClient.invalidateQueries([
              'findGroups',
              { userId: user.id },
            ]);
          },
        }
      );

      close();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset();
    // モーダルをオープンするたびにformを初期化したいため、
    // モーダルが処理対象とするグループのIDを条件としています。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Text>{t('action.sure.message')}</Text>
      <Text mt="md" color="red">
        {t('action.undone.message')}
      </Text>
      <Text>{t('group.remove.message')}</Text>
      <Highlight mt="md" highlight={[group?.name ?? '']}>
        {t('action.type.confirm.message', { value: group?.name })}
      </Highlight>
      <TextInput
        mt="xs"
        type="text"
        placeholder={t('group.name.placeholder')}
        {...form.getInputProps('name')}
      />
      <Group position="right" mt="md">
        <Button
          type="submit"
          size="sm"
          disabled={group?.name !== form.values.name}
        >
          {t('remove')}
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

const RemoveGroupModal = ({ opened, close, groupId }: ModalProps) => {
  const config = useConfig();
  const { t } = useTranslation();

  const [state, setState] = useSetState({ loading: false });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={t('group.remove')}
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <RemoveGroupForm
        groupId={groupId}
        setLoading={(loading) => setState({ loading })}
        close={close}
      />
    </Modal>
  );
};

export default RemoveGroupModal;
