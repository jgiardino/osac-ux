import type { AiModelRow } from './types';

/** Seeded from rhoai ManagedModelsDeployments / managedModelsData (simplified columns). */
export const MOCK_AI_MODELS: AiModelRow[] = [
  {
    id: '1',
    name: 'Llama-3.1-8B-Instruct',
    sourceType: 'internal',
    status: 'Ready',
    endpointUrl: 'https://llama-3-1-8b-instruct-project-x.apps.cluster.example.com',
  },
  {
    id: '2',
    name: 'Mistral-7B-Instruct-v0.3',
    sourceType: 'internal',
    status: 'Starting',
    endpointUrl: 'https://mistral-7b-instruct-v0-3-project-x.apps.cluster.example.com',
  },
  {
    id: '3',
    name: 'Qwen2.5-7B-Instruct',
    sourceType: 'internal',
    status: 'Failed',
  },
  {
    id: '4',
    name: 'Llama-3.1-8B-Instruct',
    sourceType: 'internal',
    status: 'Ready',
    endpointUrl: 'https://llama-3-1-8b-instruct-project-y.apps.cluster.example.com',
  },
  {
    id: '5',
    name: 'granite-3.1-8b-instruct',
    sourceType: 'internal',
    status: 'Stopped',
  },
  {
    id: '6',
    name: 'phi-3-mini-4k-instruct',
    sourceType: 'internal',
    status: 'Stopping',
  },
  {
    id: 'ext-1',
    name: 'gpt-4o',
    sourceType: 'external',
    status: 'Ready',
    endpointUrl: 'https://maas-gateway-project-x.apps.cluster.example.com/v1/models/gpt-4o',
  },
  {
    id: 'ext-2',
    name: 'claude-sonnet-4',
    sourceType: 'external',
    status: 'Pending',
    endpointUrl: 'https://maas-gateway-project-x.apps.cluster.example.com/v1/models/claude-sonnet-4',
  },
  {
    id: 'ext-3',
    name: 'gemini-2.0-flash',
    sourceType: 'external',
    status: 'Failed',
  },
];
