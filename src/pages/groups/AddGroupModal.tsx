import { Button, Group, LoadingOverlay, Modal, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { z } from 'zod';

import { useAddGroupMutation } from '../../generated/graphql';
import { useConfig } from '../../hooks/Config';
import useGraphQLClient from '../../hooks/GraphQLClient';
import { useUser } from '../../hooks/User';
import useValidation from '../../hooks/Validation';

type Props = {
  opened: boolean;
  onClose(): void;
};

const AddGroupModal = ({ opened, onClose }: Props) => {
  const config = useConfig();
  const { t } = useTranslation();

  const { rules } = useValidation();
  const schema = z.object({
    name: rules.groups.name.min(1),
  });

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
    },
  });

  const [state, setState] = useSetState({ loading: false });

  const graphQLClient = useGraphQLClient();
  const addGroupMutation = useAddGroupMutation(graphQLClient);
  const queryClient = useQueryClient();
  const [user] = useUser();

  const submit = async (values: typeof form.values) => {
    try {
      setState({ loading: true });

      await addGroupMutation.mutateAsync(
        { ...values, owner: user.id },
        {
          onSuccess: async () => {
            showNotification({ message: t('group.add.done.message') });
            await queryClient.invalidateQueries([
              'findGroups',
              { userId: user.id },
            ]);
          },
        }
      );

      onClose();
    } finally {
      setState({ loading: false });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('group.add')}
      centered={config.modalCentered}
    >
      <LoadingOverlay visible={state.loading} />
      <form onSubmit={form.onSubmit(submit)} noValidate>
        <TextInput
          required
          type="text"
          label={t('name')}
          description={t('group.name.description')}
          {...form.getInputProps('name')}
        />
        <Group position="right" mt="md">
          <Button type="submit" size="sm">
            {t('add')}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddGroupModal;
