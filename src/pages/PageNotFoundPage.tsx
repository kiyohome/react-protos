import { useTranslation } from 'react-i18next';

import ErrorPageLayout from './ErrorPageLayout';

const PageNotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorPageLayout
      label={t('404.label')}
      title={t('404.title')}
      description={t('404.message')}
    />
  );
};

export default PageNotFoundPage;
