import ListPage from '@osac/ui-components/components/Page/ListPage';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import { MOCK_WORKBENCHES } from './mocks';
import WorkbenchesTable from './WorkbenchesTable';

/**
 * Notebooks v2 Workspaces list structure from odh-dashboard, labeled Workbenches for this platform.
 * Create flow deferred to Catalog templates.
 */
const WorkbenchesPage = () => {
  const { t } = useTranslation();

  return (
    <ListPage
      title={t('Workbenches')}
      description={t('View your existing workspaces or create new workspaces.')}
    >
      <WorkbenchesTable workbenches={MOCK_WORKBENCHES} />
    </ListPage>
  );
};

export default WorkbenchesPage;
