import { useLocation } from 'react-router-dom';

/** Resolve list/detail paths for GenAI studio vs tenant-admin AI section. */
export const useApiKeysPaths = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin/ai');
  const listPath = isAdmin ? '/admin/ai/api-keys' : '/genai/api-keys';
  const subscriptionsListPath = `${listPath}?tab=subscriptions`;

  return {
    isAdmin,
    listPath,
    subscriptionsListPath,
    keyDetailsPath: (keyId: string) => `${listPath}/${keyId}`,
    subscriptionDetailsPath: (subscriptionId: string, tab?: string) => {
      const base = isAdmin
        ? `/admin/ai/subscriptions/${subscriptionId}`
        : `/genai/subscriptions/${subscriptionId}`;
      return tab ? `${base}/${tab}` : base;
    },
  };
};
