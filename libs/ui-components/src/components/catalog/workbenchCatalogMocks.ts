import type { CatalogItemForDisplay } from './catalogItemDisplay';

/** Demo workbench catalog templates — predefined SKUs for tenant users. */
export const WORKBENCH_CATALOG_ITEMS: CatalogItemForDisplay[] = [
  {
    id: 'wb-catalog-jupyter-gpu',
    title: 'JupyterLab GPU starter',
    description:
      'Preconfigured JupyterLab with a small GPU profile for interactive model development.',
    template: 'jupyterlab-gpu-small',
    published: true,
    metadata: {
      name: 'jupyterlab-gpu-starter',
      labels: {
        kind: 'workbench',
        image: 'JupyterLab with PyTorch',
        profile: 'Small GPU',
        price_per_hour: '1.25',
      },
    },
    field_definitions: [
      {
        path: 'resources.image',
        display_name: 'Image',
        editable: false,
        default: 'JupyterLab with PyTorch',
      },
      {
        path: 'resources.profile',
        display_name: 'Hardware profile',
        editable: false,
        default: 'Small GPU',
      },
    ],
  },
  {
    id: 'wb-catalog-jupyter-cpu',
    title: 'JupyterLab CPU',
    description: 'CPU-only JupyterLab for notebooks that do not require accelerators.',
    template: 'jupyterlab-cpu',
    published: true,
    metadata: {
      name: 'jupyterlab-cpu',
      labels: {
        kind: 'workbench',
        image: 'JupyterLab Minimal',
        profile: 'Medium CPU',
        price_per_hour: '0.35',
      },
    },
    field_definitions: [
      {
        path: 'resources.image',
        display_name: 'Image',
        editable: false,
        default: 'JupyterLab Minimal',
      },
      {
        path: 'resources.profile',
        display_name: 'Hardware profile',
        editable: false,
        default: 'Medium CPU',
      },
    ],
  },
  {
    id: 'wb-catalog-code-server',
    title: 'Code Server GPU',
    description: 'VS Code–compatible workspace with a GPU profile for training and debugging.',
    template: 'code-server-gpu',
    published: true,
    metadata: {
      name: 'code-server-gpu',
      labels: {
        kind: 'workbench',
        image: 'Code Server GPU',
        profile: 'Medium GPU',
        price_per_hour: '1.80',
      },
    },
    field_definitions: [
      {
        path: 'resources.image',
        display_name: 'Image',
        editable: false,
        default: 'Code Server GPU',
      },
      {
        path: 'resources.profile',
        display_name: 'Hardware profile',
        editable: false,
        default: 'Medium GPU',
      },
    ],
  },
];
