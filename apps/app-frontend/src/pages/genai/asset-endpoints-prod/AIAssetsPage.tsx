import { useState } from 'react';
import { Tab, TabTitleText, Tabs } from '@patternfly/react-core';

import ListPage from '@osac/ui-components/components/Page/ListPage';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import MCPTab from './MCPTab';
import ModelsTab from './ModelsTab';

type TabKey = 'models' | 'mcp';

/**
 * Production-shaped AI asset endpoints list for side-by-side comparison with the UXD prototype.
 * Tabs/columns/actions mirror odh-dashboard packages/gen-ai on main (always-on tabs only).
 */
const AIAssetsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('models');

  return (
    <ListPage
      title={t('AI asset endpoints')}
      description={t(
        'Browse endpoints for models and MCP servers that are available as AI assets.',
      )}
    >
      <Tabs
        activeKey={activeTab}
        onSelect={(_e, key) => setActiveTab(key as TabKey)}
        aria-label={t('AI Assets tabs')}
        id="aae-prod-tabs"
      >
        <Tab
          eventKey="models"
          title={<TabTitleText>{t('Models')}</TabTitleText>}
          id="aae-prod-tab-models"
        >
          <ModelsTab />
        </Tab>
        <Tab
          eventKey="mcp"
          title={<TabTitleText>{t('MCP servers')}</TabTitleText>}
          id="aae-prod-tab-mcp"
        >
          <MCPTab />
        </Tab>
      </Tabs>
    </ListPage>
  );
};

export default AIAssetsPage;
