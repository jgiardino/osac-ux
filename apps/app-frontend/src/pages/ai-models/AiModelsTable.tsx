import { useMemo, useState } from 'react';
import {
  Button,
  ClipboardCopy,
  Dropdown,
  DropdownItem,
  DropdownList,
  EmptyState,
  EmptyStateBody,
  Label,
  MenuToggle,
  Pagination,
  Popover,
  SearchInput,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import HourglassHalfIcon from '@patternfly/react-icons/dist/esm/icons/hourglass-half-icon';
import InProgressIcon from '@patternfly/react-icons/dist/esm/icons/in-progress-icon';
import OffIcon from '@patternfly/react-icons/dist/esm/icons/off-icon';
import OutlinedQuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import type {
  AiModelRow,
  ExternalModelStatus,
  InternalModelStatus,
  ModelSourceType,
} from './types';

type SourceFilter = 'all' | ModelSourceType;

/** Internal statuses from ODH `ModelStatusIcon`; Ready/Stopped/Stopping are outlined. */
const InternalStatusLabel = ({ status }: { status: InternalModelStatus }) => {
  switch (status) {
    case 'Ready':
      return (
        <Label status="success" variant="outline" icon={<CheckCircleIcon />}>
          Ready
        </Label>
      );
    case 'Starting':
      return (
        <Label color="blue" icon={<InProgressIcon />}>
          Starting
        </Label>
      );
    case 'Stopping':
      return (
        <Label color="grey" variant="outline" icon={<InProgressIcon />}>
          Stopping
        </Label>
      );
    case 'Stopped':
      return (
        <Label color="grey" variant="outline" icon={<OffIcon />}>
          Stopped
        </Label>
      );
    case 'Failed':
      return (
        <Label status="danger" icon={<ExclamationCircleIcon />}>
          Failed
        </Label>
      );
    default:
      return (
        <Label color="grey" icon={<OutlinedQuestionCircleIcon />}>
          Unknown
        </Label>
      );
  }
};

/**
 * External statuses: Ready is outline/static; Failed and Pending are filled and clickable
 * (detail drawer deferred).
 */
const ExternalStatusLabel = ({
  status,
  modelId,
}: {
  status: ExternalModelStatus;
  modelId: string;
}) => {
  const onInteractiveClick = () => {
    /* Status detail drawer deferred */
  };

  switch (status) {
    case 'Ready':
      return (
        <Label status="success" variant="outline" icon={<CheckCircleIcon />}>
          Ready
        </Label>
      );
    case 'Pending':
      return (
        <Label
          color="purple"
          icon={<HourglassHalfIcon />}
          onClick={onInteractiveClick}
          id={`ai-models-status-${modelId}`}
        >
          Pending
        </Label>
      );
    case 'Failed':
      return (
        <Label
          status="danger"
          icon={<ExclamationCircleIcon />}
          onClick={onInteractiveClick}
          id={`ai-models-status-${modelId}`}
        >
          Failed
        </Label>
      );
    default:
      return null;
  }
};

const ModelStatusLabel = ({ model }: { model: AiModelRow }) => {
  if (model.sourceType === 'external') {
    return <ExternalStatusLabel status={model.status} modelId={model.id} />;
  }
  return <InternalStatusLabel status={model.status} />;
};

interface AiModelsTableProps {
  models: AiModelRow[];
}

const AiModelsTable = ({ models }: AiModelsTableProps) => {
  const { t } = useTranslation();
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openKebabId, setOpenKebabId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return models.filter((model) => {
      if (sourceFilter !== 'all' && model.sourceType !== sourceFilter) {
        return false;
      }
      if (q && !model.name.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [models, sourceFilter, search]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const sourceColumnLabel = t('Source');

  return (
    <>
      <Toolbar id="ai-models-toolbar">
        <ToolbarContent>
          <ToolbarGroup variant="filter-group">
            <ToolbarItem>
              <ToggleGroup aria-label={t('Filter by source')}>
                <ToggleGroupItem
                  text={t('All')}
                  buttonId="ai-models-filter-all"
                  isSelected={sourceFilter === 'all'}
                  onChange={() => {
                    setSourceFilter('all');
                    setPage(1);
                  }}
                />
                <ToggleGroupItem
                  text={t('Internal')}
                  buttonId="ai-models-filter-internal"
                  isSelected={sourceFilter === 'internal'}
                  onChange={() => {
                    setSourceFilter('internal');
                    setPage(1);
                  }}
                />
                <ToggleGroupItem
                  text={t('External')}
                  buttonId="ai-models-filter-external"
                  isSelected={sourceFilter === 'external'}
                  onChange={() => {
                    setSourceFilter('external');
                    setPage(1);
                  }}
                />
              </ToggleGroup>
            </ToolbarItem>
            <ToolbarItem>
              <SearchInput
                placeholder={t('Filter by name')}
                value={search}
                onChange={(_e, value) => {
                  setSearch(value);
                  setPage(1);
                }}
                onClear={() => setSearch('')}
                aria-label={t('Filter by name')}
                id="ai-models-search"
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup variant="action-group">
            <ToolbarItem>
              <Button
                variant="primary"
                onClick={() => {
                  /* Add model flow deferred */
                }}
                id="ai-models-add-model"
              >
                {t('Add model')}
              </Button>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem align={{ default: 'alignEnd' }}>
            <Pagination
              itemCount={filtered.length}
              page={page}
              perPage={perPage}
              onSetPage={(_e, next) => setPage(next)}
              onPerPageSelect={(_e, next) => {
                setPerPage(next);
                setPage(1);
              }}
              isCompact
              widgetId="ai-models-pagination-top"
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      {pageItems.length === 0 ? (
        <EmptyState titleText={t('No models found')} headingLevel="h2">
          <EmptyStateBody>
            {search || sourceFilter !== 'all'
              ? t('No results match the filter criteria. Clear all filters and try again.')
              : t('Add a model to get started.')}
          </EmptyStateBody>
          {(search || sourceFilter !== 'all') && (
            <Button
              variant="link"
              onClick={() => {
                setSearch('');
                setSourceFilter('all');
                setPage(1);
              }}
            >
              {t('Clear all filters')}
            </Button>
          )}
        </EmptyState>
      ) : (
        <Table aria-label={t('AI Models')} variant="compact" id="ai-models-table">
          <Thead>
            <Tr>
              <Th>{t('Model name')}</Th>
              <Th
                info={{
                  popover: t(
                    'Internal models are deployed in your cluster. External models are provided by a managed service or remote provider, or deployed on another cluster.',
                  ),
                  ariaLabel: t('More information for Source'),
                  popoverProps: {
                    headerContent: t('Source'),
                  },
                }}
              >
                {sourceColumnLabel}
              </Th>
              <Th>{t('Status')}</Th>
              <Th>{t('Endpoint')}</Th>
              <Th screenReaderText={t('Actions')} />
            </Tr>
          </Thead>
          <Tbody>
            {pageItems.map((model) => {
              const showEndpoint = model.status === 'Ready' && Boolean(model.endpointUrl);
              return (
                <Tr key={model.id}>
                  <Td dataLabel={t('Model name')}>
                    <Button variant="link" isInline id={`ai-models-name-${model.id}`}>
                      {model.name}
                    </Button>
                  </Td>
                  <Td dataLabel={sourceColumnLabel}>
                    <Label
                      variant="outline"
                      color={model.sourceType === 'internal' ? 'blue' : 'purple'}
                    >
                      {model.sourceType === 'internal' ? t('Internal') : t('External')}
                    </Label>
                  </Td>
                  <Td dataLabel={t('Status')}>
                    <ModelStatusLabel model={model} />
                  </Td>
                  <Td dataLabel={t('Endpoint')}>
                    {showEndpoint && model.endpointUrl ? (
                      <Popover
                        headerContent={t('Endpoint')}
                        bodyContent={
                          <ClipboardCopy isReadOnly hoverTip={t('Copy')} clickTip={t('Copied')}>
                            {model.endpointUrl}
                          </ClipboardCopy>
                        }
                      >
                        <Button variant="link" isInline id={`ai-models-endpoint-${model.id}`}>
                          {t('View')}
                        </Button>
                      </Popover>
                    ) : (
                      '—'
                    )}
                  </Td>
                  <Td isActionCell>
                    <Dropdown
                      isOpen={openKebabId === model.id}
                      onOpenChange={(open) => setOpenKebabId(open ? model.id : null)}
                      onSelect={() => setOpenKebabId(null)}
                      popperProps={{ position: 'right' }}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          variant="plain"
                          aria-label={t('Actions')}
                          isExpanded={openKebabId === model.id}
                          onClick={() =>
                            setOpenKebabId(openKebabId === model.id ? null : model.id)
                          }
                          id={`ai-models-actions-${model.id}`}
                        >
                          <EllipsisVIcon />
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                        {model.status === 'Ready' && (
                          <DropdownItem isAriaDisabled>{t('Stop')}</DropdownItem>
                        )}
                        {(model.status === 'Stopped' || model.status === 'Failed') && (
                          <DropdownItem isAriaDisabled>{t('Start')}</DropdownItem>
                        )}
                        <DropdownItem isAriaDisabled>{t('Delete')}</DropdownItem>
                      </DropdownList>
                    </Dropdown>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      <Pagination
        itemCount={filtered.length}
        page={page}
        perPage={perPage}
        onSetPage={(_e, next) => setPage(next)}
        onPerPageSelect={(_e, next) => {
          setPerPage(next);
          setPage(1);
        }}
        variant="bottom"
        isCompact
        widgetId="ai-models-pagination-bottom"
      />
    </>
  );
};

export default AiModelsTable;
