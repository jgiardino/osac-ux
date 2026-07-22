import { type ReactElement } from 'react';
import { Navigate, Route } from 'react-router-dom';

import ErrorBoundary from '@osac/ui-components/components/ErrorBoundary/ErrorBoundary';
import { useSession } from '@osac/ui-components/hooks/use-session';
import { PlaceholderPage } from '@osac/ui-components/PlaceholderPage';
import type { DemoShellRole } from '@osac/ui-components/shellTypes';

import { useAiVisionLayer } from './AiVisionLayerContext';
import {
  ApiKeyDetailsPage,
  ApiKeysPage,
  SubscriptionDetailsPage,
} from '../pages/genai/api-keys';
import { AiAssetEndpointsPage } from '../pages/genai/asset-endpoints';
import { AiAssetEndpointsProdPage } from '../pages/genai/asset-endpoints-prod';
import { PlaygroundPage } from '../pages/genai/playground';

const AiVisionRoleRoute = ({
  allow,
  fallback,
  children,
}: {
  allow: DemoShellRole[];
  fallback: string;
  children: ReactElement;
}) => {
  const { role } = useSession();
  const { isAiVisionLayer } = useAiVisionLayer();
  if (!isAiVisionLayer || !allow.includes(role)) {
    return <Navigate to={fallback} replace />;
  }
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

/**
 * Additive twin of shellRoutes.ts — Route elements for the AI vision layer.
 * Must be inlined under <Routes> (React Router ignores Route trees inside custom components).
 */
export const shellRoutesAiVision = (defaultRoute: string) => (
  <>
    <Route
      path="/workbenches"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <PlaceholderPage
            title="Workbenches"
            lede="Open and manage notebook environments launched from GPU Notebook SKUs."
          />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/pipelines"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <PlaceholderPage
            title="Pipelines"
            lede="Track training and fine-tuning jobs launched from training cluster SKUs."
          />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/genai/endpoints"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <AiAssetEndpointsPage />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/genai/endpoints-prod"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <AiAssetEndpointsProdPage />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/genai/playground"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <PlaygroundPage />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/genai/api-keys"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <ApiKeysPage />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/genai/api-keys/:keyId"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <ApiKeyDetailsPage />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/genai/subscriptions/:subscriptionId/:tab?"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <SubscriptionDetailsPage />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/resources/gpu-status"
      element={
        <AiVisionRoleRoute allow={['tenantUser']} fallback={defaultRoute}>
          <PlaceholderPage
            title="GPU status"
            lede="View GPU utilization and allocation for your hands-on workloads."
          />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/admin/ai/maas-governance"
      element={
        <AiVisionRoleRoute allow={['tenantAdmin']} fallback={defaultRoute}>
          <PlaceholderPage
            title="MaaS governance"
            lede="Manage which AI gateway endpoints are available to developers. Assign policies, subscriptions, and access groups."
          />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/admin/ai/model-catalog-settings"
      element={
        <AiVisionRoleRoute allow={['tenantAdmin']} fallback={defaultRoute}>
          <PlaceholderPage
            title="Model catalog settings"
            lede="Configure sources of models available for tenant users to customize and deploy (base model library — not AI asset endpoints). In the current prototype, SKU and catalog authoring may still live under provider Catalog Studio."
          />
        </AiVisionRoleRoute>
      }
    />
    <Route
      path="/admin/ai/usage"
      element={
        <AiVisionRoleRoute allow={['tenantAdmin']} fallback={defaultRoute}>
          <PlaceholderPage
            title="Usage"
            lede="View AI consumption across your organization — gateway tokens and GPU attribution by team or project."
          />
        </AiVisionRoleRoute>
      }
    />
  </>
);
