import { useMemo, useState } from 'react';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  Label,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  Switch,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import { ActionsColumn, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import ListPage from '@osac/ui-components/components/Page/ListPage';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import CatalogSourceStatusLabel from './CatalogSourceStatusLabel';
import { MOCK_CATALOG_SOURCE_CONFIGS } from './mocks';
import type { CatalogSourceConfigRow, CatalogSourceType } from './types';

const sourceTypeLabel = (type: CatalogSourceType, t: (key: string) => string) =>
  type === 'hf' ? t('Hugging Face') : t('YAML file');

const hasSourceFilters = (source: CatalogSourceConfigRow) =>
  Boolean(
    (source.includedModels && source.includedModels.length > 0) ||
      (source.excludedModels && source.excludedModels.length > 0),
  );

const organizationDisplay = (source: CatalogSourceConfigRow) => {
  if (source.isDefault || source.type !== 'hf') {
    return '—';
  }
  return source.allowedOrganization || '—';
};

const ModelCatalogSettingsPage = () => {
  const { t } = useTranslation();
  const [sources, setSources] = useState<CatalogSourceConfigRow[]>(MOCK_CATALOG_SOURCE_CONFIGS);
  const [deleteTarget, setDeleteTarget] = useState<CatalogSourceConfigRow | null>(null);

  const isEmpty = sources.length === 0;

  const handleToggle = (sourceId: string, enabled: boolean) => {
    setSources((prev) => prev.map((s) => (s.id === sourceId ? { ...s, enabled } : s)));
  };

  const handleDelete = () => {
    if (!deleteTarget) {
      return;
    }
    setSources((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const emptyState = useMemo(
    () => (
      <EmptyState
        headingLevel="h2"
        icon={PlusCircleIcon}
        titleText={t('No catalog sources')}
        id="model-catalog-settings-empty"
      >
        <EmptyStateBody>
          {t('No catalog sources have been configured. Add a source to get started.')}
        </EmptyStateBody>
        <Button
          variant="primary"
          onClick={() => {
            /* Add source flow deferred */
          }}
          id="model-catalog-settings-add-empty"
        >
          {t('Add a source')}
        </Button>
      </EmptyState>
    ),
    [t],
  );

  return (
    <ListPage
      title={t('Model catalog settings')}
      description={t(
        'Add and manage model sources that populate the model catalog for users in your organization.',
      )}
    >
      {isEmpty ? (
        emptyState
      ) : (
        <>
          <Toolbar id="model-catalog-settings-toolbar">
            <ToolbarContent>
              <ToolbarItem>
                <Button
                  variant="primary"
                  onClick={() => {
                    /* Add source flow deferred */
                  }}
                  id="model-catalog-settings-add"
                >
                  {t('Add a source')}
                </Button>
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>

          <Table
            aria-label={t('Model catalog sources')}
            variant="compact"
            id="model-catalog-settings-table"
          >
            <Thead>
              <Tr>
                <Th>{t('Source name')}</Th>
                <Th
                  info={{
                    popover: t(
                      'Applies only to Hugging Face sources. Shows the organization the source syncs models from (for example, meta-llama). Only models within this organization are included in the catalog.',
                    ),
                    ariaLabel: t('More information for Organization'),
                  }}
                >
                  {t('Organization')}
                </Th>
                <Th
                  info={{
                    popover: (
                      <div>
                        <p>
                          {t(
                            'Shows whether all models from a source appear in the model catalog or if visibility is filtered.',
                          )}
                        </p>
                        <List>
                          <ListItem>
                            <strong>{t('All models:')}</strong>{' '}
                            {t('Every model from the source appears in the catalog.')}
                          </ListItem>
                          <ListItem>
                            <strong>{t('Filtered:')}</strong>{' '}
                            {t(
                              'Only specific models appear, based on the visibility settings for that source.',
                            )}
                          </ListItem>
                        </List>
                      </div>
                    ),
                    ariaLabel: t('More information for Model visibility'),
                  }}
                >
                  {t('Model visibility')}
                </Th>
                <Th>{t('Source type')}</Th>
                <Th
                  info={{
                    popover: t(
                      'Enable a source to make its models available to users in your organization from the model catalog.',
                    ),
                    ariaLabel: t('More information for Enable'),
                  }}
                >
                  {t('Enable')}
                </Th>
                <Th>{t('Validation status')}</Th>
                <Th />
                <Th screenReaderText={t('Actions')} />
              </Tr>
            </Thead>
            <Tbody>
              {sources.map((source) => (
                <Tr key={source.id}>
                  <Td dataLabel={t('Source name')}>{source.name}</Td>
                  <Td dataLabel={t('Organization')}>{organizationDisplay(source)}</Td>
                  <Td dataLabel={t('Model visibility')}>
                    {hasSourceFilters(source) ? (
                      <Label color="purple">{t('Filtered')}</Label>
                    ) : (
                      <Label color="grey" variant="outline">
                        {t('All models')}
                      </Label>
                    )}
                  </Td>
                  <Td dataLabel={t('Source type')}>{sourceTypeLabel(source.type, t)}</Td>
                  <Td dataLabel={t('Enable')}>
                    <Switch
                      id={`catalog-source-enable-${source.id}`}
                      aria-label={t('Enable {{name}}', { name: source.name })}
                      isChecked={source.enabled}
                      onChange={(_e, checked) => handleToggle(source.id, checked)}
                    />
                  </Td>
                  <Td dataLabel={t('Validation status')}>
                    <CatalogSourceStatusLabel source={source} />
                  </Td>
                  <Td dataLabel={t('Manage source')}>
                    <Button
                      variant="link"
                      isInline
                      onClick={() => {
                        /* Manage source deferred */
                      }}
                      id={`catalog-source-manage-${source.id}`}
                    >
                      {t('Manage source')}
                    </Button>
                  </Td>
                  <Td isActionCell>
                    {!source.isDefault && (
                      <ActionsColumn
                        items={[
                          {
                            title: t('Delete source'),
                            onClick: () => setDeleteTarget(source),
                          },
                        ]}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}

      <Modal
        variant={ModalVariant.small}
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        id="catalog-source-delete-modal"
      >
        <ModalHeader title={t('Delete a source')} />
        <ModalBody>
          {t('The {{name}} repository will be deleted, and its models will be removed from the model catalog.', {
            name: deleteTarget?.name ?? '',
          })}
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleDelete} id="catalog-source-delete-confirm">
            {t('Delete')}
          </Button>
          <Button variant="link" onClick={() => setDeleteTarget(null)}>
            {t('Cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </ListPage>
  );
};

export default ModelCatalogSettingsPage;
