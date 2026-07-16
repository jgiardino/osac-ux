/**
 * Nav id → icon map for AI vision sidebar items.
 * Icon components live in assets/ai-vision-icons; this file only wires ids to components.
 */
import type { ComponentType } from 'react';
import type { SVGIconProps } from '@patternfly/react-icons/dist/esm/createIcon';
import BalanceScaleIcon from '@patternfly/react-icons/dist/esm/icons/balance-scale-icon';
import CatalogIcon from '@patternfly/react-icons/dist/esm/icons/catalog-icon';
import ChartLineIcon from '@patternfly/react-icons/dist/esm/icons/chart-line-icon';
import CloudIcon from '@patternfly/react-icons/dist/esm/icons/cloud-icon';
import MicrochipIcon from '@patternfly/react-icons/dist/esm/icons/microchip-icon';

import {
  RhUiAiEditIcon,
  RhUiBuildIcon,
  RhUiKeyIcon,
  RhUiPathIcon,
} from '../assets/ai-vision-icons/AiVisionIcons';

const AI_VISION_NAV_ICONS: Record<string, ComponentType<SVGIconProps>> = {
  workbenches: RhUiBuildIcon,
  pipelines: RhUiPathIcon,
  'ai-asset-endpoints': CloudIcon,
  playground: RhUiAiEditIcon,
  'api-keys': RhUiKeyIcon,
  'gpu-status': MicrochipIcon,
  'maas-governance': BalanceScaleIcon,
  'model-catalog-settings': CatalogIcon,
  'ai-usage': ChartLineIcon,
};

export const aiVisionNavIcon = (itemId: string) => {
  const Icon = AI_VISION_NAV_ICONS[itemId];
  return Icon ? <Icon aria-hidden /> : undefined;
};
