/**
 * Additive twin of shellNav.ts for the AI vision layer.
 * Merges onto baseline shellNav without rewriting it.
 */
import type { TFunction } from 'i18next';

import type { DemoShellRole } from '@osac/ui-components/shellTypes';

import type { NavLink, NavRow } from './shellNav';

/** Nav item ids that belong to the AI vision layer (for AI labels). */
export const AI_VISION_NAV_IDS = new Set([
  'workbenches',
  'pipelines',
  'ai-asset-endpoints',
  'ai-asset-endpoints-prod',
  'playground',
  'api-keys',
  'gpu-status',
  'maas-governance',
  'model-catalog-settings',
  'ai-usage',
]);

export const isAiVisionNavItem = (itemId: string): boolean => AI_VISION_NAV_IDS.has(itemId);

const appendLinks = (rows: NavRow[], sectionId: string, links: NavLink[]): NavRow[] =>
  rows.map((section) =>
    section.sectionId === sectionId
      ? { ...section, children: [...section.children, ...links] }
      : section,
  );

const insertSectionBefore = (
  rows: NavRow[],
  beforeSectionId: string,
  section: NavRow,
): NavRow[] => {
  const idx = rows.findIndex((row) => row.sectionId === beforeSectionId);
  if (idx === -1) {
    return [...rows, section];
  }
  return [...rows.slice(0, idx), section, ...rows.slice(idx)];
};

const mergeTenantUserVisionNav = (rows: NavRow[], t: TFunction): NavRow[] => {
  let next = appendLinks(rows, 'nav-tenant-services', [
    { id: 'workbenches', label: t('Workbenches'), path: '/workbenches' },
    { id: 'pipelines', label: t('Pipelines'), path: '/pipelines' },
  ]);

  next = insertSectionBefore(next, 'nav-tenant-network', {
    kind: 'section',
    sectionId: 'nav-tenant-genai-studio',
    label: t('GenAI studio'),
    children: [
      {
        id: 'ai-asset-endpoints-prod',
        label: t('AI asset endpoints'),
        path: '/genai/endpoints-prod',
      },
      { id: 'playground', label: t('Playground'), path: '/genai/playground' },
      { id: 'api-keys', label: t('API keys'), path: '/genai/api-keys' },
    ],
  });

  next = appendLinks(next, 'nav-tenant-storage', [
    { id: 'gpu-status', label: t('GPU status'), path: '/resources/gpu-status' },
  ]);

  return next;
};

const mergeTenantAdminVisionNav = (rows: NavRow[], t: TFunction): NavRow[] =>
  insertSectionBefore(rows, 'nav-dev', {
    kind: 'section',
    sectionId: 'nav-admin-ai',
    label: t('AI'),
    children: [
      { id: 'maas-governance', label: t('MaaS governance'), path: '/admin/ai/maas-governance' },
      {
        id: 'model-catalog-settings',
        label: t('Model catalog settings'),
        path: '/admin/ai/model-catalog-settings',
      },
      { id: 'ai-usage', label: t('Usage'), path: '/admin/ai/usage' },
    ],
  });

/** Returns baseline rows unchanged when the vision layer is off. */
export const mergeAiVisionNav = (
  rows: NavRow[],
  role: DemoShellRole,
  t: TFunction,
  enabled: boolean,
): NavRow[] => {
  if (!enabled) {
    return rows;
  }
  if (role === 'tenantUser') {
    return mergeTenantUserVisionNav(rows, t);
  }
  if (role === 'tenantAdmin') {
    return mergeTenantAdminVisionNav(rows, t);
  }
  return rows;
};
