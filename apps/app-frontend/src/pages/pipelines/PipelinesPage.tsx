import ListPage from '@osac/ui-components/components/Page/ListPage';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import { MOCK_PIPELINES } from './mocks';
import PipelinesTable from './PipelinesTable';

/**
 * Pipeline definitions list from odh-dashboard (latest main).
 * Project selector and pipeline server chrome omitted (tenant admin concern).
 */
const PipelinesPage = () => {
  const { t } = useTranslation();

  return (
    <ListPage
      title={t('Pipeline definitions')}
      description={t('Manage your pipelines and their versions.')}
    >
      <PipelinesTable pipelines={MOCK_PIPELINES} />
    </ListPage>
  );
};

export default PipelinesPage;
