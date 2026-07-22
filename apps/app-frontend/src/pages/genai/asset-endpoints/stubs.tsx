/**
 * Minimal stand-ins for RHOAI prototype utilities used by AI Asset Endpoints.
 * Iterate/replace as we align with osac-ux patterns.
 */
import * as React from 'react';
import ShareAltIcon from '@patternfly/react-icons/dist/esm/icons/share-alt-icon';

import { useSession } from '@osac/ui-components/hooks/use-session';

/** Sets `document.title` — stand-in for `@app/utils/useDocumentTitle`. */
export const useDocumentTitle = (title: string) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
};

/** Prototype profiles → approximate with demo shell roles. */
export const useUserProfile = () => {
  const { role } = useSession();
  const userProfile =
    role === 'tenantAdmin' || role === 'providerAdmin' ? 'AI Admin' : 'AI Engineer';
  return { userProfile };
};

/**
 * Feature-flag stand-in for `@app/utils/FeatureFlagsContext`.
 * Detail-page flags stay off so list rows do not navigate into missing pages.
 */
export const useFeatureFlags = () => {
  const [selectedProject, setSelectedProject] = React.useState('AI Platform Team');

  const flags = {
    showProjectWorkspaceDropdowns: false,
    enableCardTableViewSwitcher: false,
    enableModelDescriptionPages: false,
    enableMcpDetailsPage: false,
    showVectorStoreTags: false,
  };

  return { flags, selectedProject, setSelectedProject };
};

/** Stand-in for unused `modelLogos` import in AIAssets mock data. */
export const modelLogos: Record<string, string> = {};

interface AIAssetEndpointsIconProps {
  withBackground?: boolean;
  size?: number;
  backgroundColor?: string;
  className?: string;
}

/** Stand-in for RHOAI Home icon — ShareAlt in a simple background. */
export const AIAssetEndpointsIcon: React.FunctionComponent<AIAssetEndpointsIconProps> = ({
  withBackground = false,
  size = 32,
  backgroundColor,
  className = '',
}) => {
  if (withBackground) {
    const containerSize = size + 8;
    const innerIconSize = size - 8;
    return (
      <div
        className={className}
        style={{
          background: backgroundColor || 'var(--pf-t--global--background--color--secondary--default)',
          borderRadius: '20px',
          padding: '4px',
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ShareAltIcon style={{ width: `${innerIconSize}px`, height: `${innerIconSize}px` }} />
      </div>
    );
  }

  return <ShareAltIcon style={{ width: `${size}px`, height: `${size}px` }} className={className} />;
};
