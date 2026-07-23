export interface PipelineVersionRow {
  id: string;
  name: string;
  createdAt: string;
}

export interface PipelineRow {
  id: string;
  name: string;
  totalVersions: number;
  createdAt: string;
  updatedAt: string;
  versions: PipelineVersionRow[];
}
