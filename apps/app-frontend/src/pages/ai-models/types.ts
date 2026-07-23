export type ModelSourceType = 'internal' | 'external';

/** KServe / ODH ModelStatusIcon labels for in-cluster deployments. */
export type InternalModelStatus =
  | 'Ready'
  | 'Starting'
  | 'Stopping'
  | 'Stopped'
  | 'Failed'
  | 'Unknown';

/** Managed / external model health labels (Failed and Pending are interactive). */
export type ExternalModelStatus = 'Ready' | 'Pending' | 'Failed';

export type ModelDeploymentStatus = InternalModelStatus | ExternalModelStatus;

export type AiModelRow =
  | {
      id: string;
      name: string;
      sourceType: 'internal';
      status: InternalModelStatus;
      /** When set and status is Ready, Endpoint column shows View + popover URL */
      endpointUrl?: string;
    }
  | {
      id: string;
      name: string;
      sourceType: 'external';
      status: ExternalModelStatus;
      endpointUrl?: string;
    };
