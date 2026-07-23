import { useSession } from '@osac/ui-components/hooks/use-session';
import { MaaSListPage } from '@osac/ui-components/pages/tenant/MaaSListPage';

import AiModelsPage from './AiModelsPage';
import { useAiVisionLayer } from '../../shell/AiVisionLayerContext';


/**
 * When AI vision is on for tenant users, show the Deployments-shaped AI Models list.
 * Otherwise keep the baseline MaaS access list.
 */
const ModelsRouteSwitch = () => {
  const { isAiVisionLayer } = useAiVisionLayer();
  const { role } = useSession();

  if (isAiVisionLayer && role === 'tenantUser') {
    return <AiModelsPage />;
  }

  return <MaaSListPage />;
};

export default ModelsRouteSwitch;
