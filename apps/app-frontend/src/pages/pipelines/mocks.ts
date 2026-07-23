import type { PipelineRow } from './types';

export const MOCK_PIPELINES: PipelineRow[] = [
  {
    id: 'pipe-1',
    name: 'text-generation-eval',
    totalVersions: 3,
    createdAt: '2026-03-12T14:22:00Z',
    updatedAt: '2026-06-01T09:10:00Z',
    versions: [
      { id: 'v3', name: 'v3-metrics', createdAt: '2026-06-01T09:10:00Z' },
      { id: 'v2', name: 'v2-baseline', createdAt: '2026-04-18T11:00:00Z' },
      { id: 'v1', name: 'v1-initial', createdAt: '2026-03-12T14:22:00Z' },
    ],
  },
  {
    id: 'pipe-2',
    name: 'rag-ingest-pipeline',
    totalVersions: 2,
    createdAt: '2026-05-02T08:00:00Z',
    updatedAt: '2026-05-20T16:45:00Z',
    versions: [
      { id: 'rag-v2', name: 'chunking-v2', createdAt: '2026-05-20T16:45:00Z' },
      { id: 'rag-v1', name: 'chunking-v1', createdAt: '2026-05-02T08:00:00Z' },
    ],
  },
  {
    id: 'pipe-3',
    name: 'model-deploy-smoke',
    totalVersions: 1,
    createdAt: '2026-07-01T12:30:00Z',
    updatedAt: '2026-07-01T12:30:00Z',
    versions: [{ id: 'smoke-v1', name: 'default', createdAt: '2026-07-01T12:30:00Z' }],
  },
];
