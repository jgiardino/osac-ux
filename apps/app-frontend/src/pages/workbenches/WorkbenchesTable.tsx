import { useMemo, useState } from 'react';
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  EmptyState,
  EmptyStateBody,
  Label,
  MenuToggle,
  Pagination,
  SearchInput,
  Select,
  SelectList,
  SelectOption,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import ExpandedWorkbenchRow from './ExpandedWorkbenchRow';
import type { WorkbenchRow, WorkbenchState } from './types';

type FilterType = 'name' | 'kind' | 'image' | 'state';

const STATE_OPTIONS: WorkbenchState[] = [
  'Error',
  'Paused',
  'Pending',
  'Running',
  'Terminating',
  'Unknown',
];

const stateLabel = (state: WorkbenchState) => {
  switch (state) {
    case 'Running':
      return (
        <Label status="success" variant="outline">
          {state}
        </Label>
      );
    case 'Error':
      return (
        <Label status="danger" variant="outline">
          {state}
        </Label>
      );
    case 'Pending':
    case 'Terminating':
      return (
        <Label status="warning" variant="outline">
          {state}
        </Label>
      );
    default:
      return (
        <Label color="grey" variant="outline">
          {state}
        </Label>
      );
  }
};

const formatLastActivity = (ms: number) => {
  if (!ms) {
    return 'unknown';
  }
  const minutes = Math.max(1, Math.round((Date.now() - ms) / 60000));
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 48) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};

interface WorkbenchesTableProps {
  workbenches: WorkbenchRow[];
}

const WorkbenchesTable = ({ workbenches }: WorkbenchesTableProps) => {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<FilterType>('name');
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [openKebabId, setOpenKebabId] = useState<string | null>(null);
  const [openConnectId, setOpenConnectId] = useState<string | null>(null);

  const filterTypeLabel = (key: FilterType) => {
    switch (key) {
      case 'kind':
        return t('Kind');
      case 'image':
        return t('Image');
      case 'state':
        return t('State');
      default:
        return t('Name');
    }
  };

  const filterPlaceholder = (key: FilterType) => {
    switch (key) {
      case 'kind':
        return t('Filter by kind');
      case 'image':
        return t('Filter by image');
      case 'state':
        return t('Filter by state');
      default:
        return t('Filter by name');
    }
  };

  const filtered = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return workbenches.filter((wb) => {
      if (filterType === 'state') {
        return !stateFilter || wb.state === stateFilter;
      }
      if (!q) {
        return true;
      }
      if (filterType === 'kind') {
        return wb.kind.toLowerCase().includes(q);
      }
      if (filterType === 'image') {
        return wb.image.toLowerCase().includes(q);
      }
      return wb.name.toLowerCase().includes(q);
    });
  }, [workbenches, filterType, searchValue, stateFilter]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const columnCount = 9;

  const clearFilters = () => {
    setSearchValue('');
    setStateFilter('');
    setPage(1);
  };

  return (
    <>
      <Toolbar id="workbenches-toolbar">
        <ToolbarContent>
          <ToolbarItem>
            <Select
              isOpen={filterTypeOpen}
              onOpenChange={setFilterTypeOpen}
              selected={filterType}
              onSelect={(_e, value) => {
                if (typeof value === 'string') {
                  setFilterType(value as FilterType);
                  setSearchValue('');
                  setStateFilter('');
                  setPage(1);
                }
                setFilterTypeOpen(false);
              }}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={() => setFilterTypeOpen(!filterTypeOpen)}
                  isExpanded={filterTypeOpen}
                  icon={<FilterIcon />}
                >
                  {filterTypeLabel(filterType)}
                </MenuToggle>
              )}
            >
              <SelectList>
                {(['name', 'kind', 'image', 'state'] as const).map((key) => (
                  <SelectOption key={key} value={key}>
                    {filterTypeLabel(key)}
                  </SelectOption>
                ))}
              </SelectList>
            </Select>
          </ToolbarItem>
          <ToolbarItem>
            {filterType === 'state' ? (
              <Select
                isOpen={stateOpen}
                onOpenChange={setStateOpen}
                selected={stateFilter || undefined}
                onSelect={(_e, value) => {
                  setStateFilter(typeof value === 'string' ? value : '');
                  setStateOpen(false);
                  setPage(1);
                }}
                toggle={(toggleRef) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setStateOpen(!stateOpen)}
                    isExpanded={stateOpen}
                  >
                    {stateFilter || t('Filter by state')}
                  </MenuToggle>
                )}
              >
                <SelectList>
                  <SelectOption value="">{t('Filter by state')}</SelectOption>
                  {STATE_OPTIONS.map((state) => (
                    <SelectOption key={state} value={state}>
                      {state}
                    </SelectOption>
                  ))}
                </SelectList>
              </Select>
            ) : (
              <SearchInput
                placeholder={filterPlaceholder(filterType)}
                value={searchValue}
                onChange={(_e, value) => {
                  setSearchValue(value);
                  setPage(1);
                }}
                onClear={() => setSearchValue('')}
                aria-label={t('Filter workbenches')}
              />
            )}
          </ToolbarItem>
          <ToolbarItem>
            <Button
              variant="primary"
              onClick={() => {
                /* Creation deferred: launch from Catalog workbench templates */
              }}
            >
              {t('Create workspace')}
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      {pageItems.length === 0 ? (
        <EmptyState titleText={t('No results found')} headingLevel="h2">
          <EmptyStateBody>
            {t('No results match the filter criteria. Clear all filters and try again.')}
          </EmptyStateBody>
          <Button variant="link" onClick={clearFilters}>
            {t('Clear all filters')}
          </Button>
        </EmptyState>
      ) : (
        <Table aria-label={t('Workbenches')} variant="compact">
          <Thead>
            <Tr>
              <Th />
              <Th>{t('Name')}</Th>
              <Th>{t('Image')}</Th>
              <Th>{t('Pod config')}</Th>
              <Th>{t('Kind')}</Th>
              <Th>{t('State')}</Th>
              <Th>{t('Last activity')}</Th>
              <Th screenReaderText={t('Connect')} />
              <Th screenReaderText={t('Actions')} />
            </Tr>
          </Thead>
          {pageItems.map((wb) => {
            const isExpanded = expandedIds.has(wb.id);
            return (
              <Tbody key={wb.id} isExpanded={isExpanded}>
                <Tr>
                  <Td
                    expand={{
                      rowIndex: 0,
                      isExpanded,
                      onToggle: () => {
                        setExpandedIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(wb.id)) {
                            next.delete(wb.id);
                          } else {
                            next.add(wb.id);
                          }
                          return next;
                        });
                      },
                      expandId: `workbench-expand-${wb.id}`,
                    }}
                  />
                  <Td dataLabel={t('Name')}>{wb.name}</Td>
                  <Td dataLabel={t('Image')}>{wb.image}</Td>
                  <Td dataLabel={t('Pod config')}>{wb.podConfig}</Td>
                  <Td dataLabel={t('Kind')}>{wb.kind}</Td>
                  <Td dataLabel={t('State')}>{stateLabel(wb.state)}</Td>
                  <Td dataLabel={t('Last activity')}>{formatLastActivity(wb.lastActivityMs)}</Td>
                  <Td>
                    <Dropdown
                      isOpen={openConnectId === wb.id}
                      onOpenChange={(open) => setOpenConnectId(open ? wb.id : null)}
                      onSelect={() => setOpenConnectId(null)}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          variant="secondary"
                          isExpanded={openConnectId === wb.id}
                          isDisabled={wb.state !== 'Running' || wb.connectEndpoints.length === 0}
                          aria-label={t('Select connection endpoint')}
                          onClick={() =>
                            setOpenConnectId(openConnectId === wb.id ? null : wb.id)
                          }
                        >
                          {t('Connect')}
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                        {wb.connectEndpoints.map((endpoint) => (
                          <DropdownItem key={`${wb.id}-${endpoint.displayName}`}>
                            {endpoint.displayName}
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    </Dropdown>
                  </Td>
                  <Td isActionCell>
                    <Dropdown
                      isOpen={openKebabId === wb.id}
                      onOpenChange={(open) => setOpenKebabId(open ? wb.id : null)}
                      onSelect={() => setOpenKebabId(null)}
                      popperProps={{ position: 'right' }}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          variant="plain"
                          aria-label={t('Actions')}
                          onClick={() => setOpenKebabId(openKebabId === wb.id ? null : wb.id)}
                        >
                          <EllipsisVIcon />
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                        <DropdownItem>{t('View Details')}</DropdownItem>
                        <DropdownItem>{t('Edit')}</DropdownItem>
                        <DropdownItem>{t('Delete')}</DropdownItem>
                        <Divider component="li" />
                        {wb.state === 'Running' ? (
                          <>
                            <DropdownItem isAriaDisabled>{t('Stop')}</DropdownItem>
                            <DropdownItem isAriaDisabled>{t('Restart')}</DropdownItem>
                          </>
                        ) : (
                          <DropdownItem isAriaDisabled>{t('Start')}</DropdownItem>
                        )}
                      </DropdownList>
                    </Dropdown>
                  </Td>
                </Tr>
                <ExpandedWorkbenchRow
                  workbench={wb}
                  isExpanded={isExpanded}
                  columnCount={columnCount}
                />
              </Tbody>
            );
          })}
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
        widgetId="workbenches-pagination"
      />
    </>
  );
};

export default WorkbenchesTable;
