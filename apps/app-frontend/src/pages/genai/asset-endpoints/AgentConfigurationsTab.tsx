/**
 * Stub for RHOAI AgentConfigurationsTab — avoids pulling Playground dependencies
 * until that page is ported. Replace with the real tab when ready.
 */
import type { FunctionComponent } from 'react';
import { Content, ContentVariants, EmptyState, EmptyStateBody } from '@patternfly/react-core';

interface AgentConfigurationsTabProps {
  onTryInPlayground?: (config: unknown) => void;
}

export const AgentConfigurationsTab: FunctionComponent<AgentConfigurationsTabProps> = () => (
  <EmptyState>
    <EmptyStateBody>
      <Content component={ContentVariants.p}>
        Agent configurations will appear here once the Playground page is available in this
        prototype.
      </Content>
    </EmptyStateBody>
  </EmptyState>
);
