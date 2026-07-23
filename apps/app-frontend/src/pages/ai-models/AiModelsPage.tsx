import ListPage from '@osac/ui-components/components/Page/ListPage';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import AiModelsTable from './AiModelsTable';
import { MOCK_AI_MODELS } from './mocks';

/**
 * AI vision Models list — simplified from rhoai ManagedModelsDeployments.
 * Baseline MaaS access list remains for non–AI-vision shell use.
 */
const AiModelsPage = () => {
  const { t } = useTranslation();

  return (
    <ListPage
      title={t('AI Models')}
      description={t('Manage and view the health and performance of your AI models.')}
    >
      <AiModelsTable models={MOCK_AI_MODELS} />
    </ListPage>
  );
};

export default AiModelsPage;
