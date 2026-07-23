export type WorkbenchState =
  | 'Running'
  | 'Paused'
  | 'Pending'
  | 'Terminating'
  | 'Error'
  | 'Unknown';

export interface WorkbenchConnectEndpoint {
  displayName: string;
  httpPath: string;
}

export interface WorkbenchRow {
  id: string;
  name: string;
  image: string;
  podConfig: string;
  kind: string;
  state: WorkbenchState;
  lastActivityMs: number;
  /** HTTP services shown under the Connect dropdown (ODH Workspaces). */
  connectEndpoints: WorkbenchConnectEndpoint[];
  homeVolume: string;
  dataVolumes: string[];
  packages: string[];
  cpu: string;
  memory: string;
}
