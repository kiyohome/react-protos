import { useTranslation } from 'react-i18next';

import ErrorPageLayout from './ErrorPageLayout';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorPageLayout
      label={t('500.label')}
      title={t('500.title')}
      description={t('500.message')}
    />
  );
};

export default ErrorPage;
