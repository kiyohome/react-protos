import { Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title order={3}>{t('welcome')}</Title>
      <Text>{t('welcome.message')}</Text>
    </>
  );
};

export default WelcomePage;
