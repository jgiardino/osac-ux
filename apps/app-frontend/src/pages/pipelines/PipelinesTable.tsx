import { useMemo, useState } from 'react';
import {
  Button,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownList,
  EmptyState,
  EmptyStateBody,
  MenuToggle,
  MenuToggleAction,
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
import { ExpandableRowContent, Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import type { PipelineRow } from './types';

type FilterType = 'name' | 'createdAfter';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

interface PipelinesTableProps {
  pipelines: PipelineRow[];
}

const PipelinesTable = ({ pipelines }: PipelinesTableProps) => {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<FilterType>('name');
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [createdAfter, setCreatedAfter] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedVersionIds, setSelectedVersionIds] = useState<Set<string>>(new Set());
  const [importOpen, setImportOpen] = useState(false);
  const [toolbarKebabOpen, setToolbarKebabOpen] = useState(false);
  const [rowKebabId, setRowKebabId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = nameFilter.trim().toLowerCase();
    const afterMs = createdAfter ? new Date(createdAfter).getTime() : null;
    return pipelines.filter((p) => {
      if (filterType === 'name' && q && !p.name.toLowerCase().includes(q)) {
        return false;
      }
      if (filterType === 'createdAfter' && afterMs !== null) {
        if (new Date(p.createdAt).getTime() < afterMs) {
          return false;
        }
      }
      return true;
    });
  }, [pipelines, filterType, nameFilter, createdAfter]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const allPageSelected =
    pageItems.length > 0 && pageItems.every((p) => selectedIds.has(p.id));

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setNameFilter('');
    setCreatedAfter('');
    setPage(1);
  };

  return (
    <>
      <Toolbar id="pipelines-toolbar">
        <ToolbarContent>
          <ToolbarItem>
            <Select
              isOpen={filterTypeOpen}
              onOpenChange={setFilterTypeOpen}
              selected={filterType}
              onSelect={(_e, value) => {
                if (value === 'name' || value === 'createdAfter') {
                  setFilterType(value as FilterType);
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
                  {filterType === 'createdAfter' ? t('Created after') : t('Pipeline name')}
                </MenuToggle>
              )}
            >
              <SelectList>
                <SelectOption value="name">{t('Pipeline name')}</SelectOption>
                <SelectOption value="createdAfter">{t('Created after')}</SelectOption>
              </SelectList>
            </Select>
          </ToolbarItem>
          <ToolbarItem>
            {filterType === 'createdAfter' ? (
              <DatePicker
                value={createdAfter}
                onChange={(_e, value) => {
                  setCreatedAfter(value);
                  setPage(1);
                }}
                aria-label={t('Select a creation date')}
              />
            ) : (
              <SearchInput
                placeholder={t('Name')}
                value={nameFilter}
                onChange={(_e, value) => {
                  setNameFilter(value);
                  setPage(1);
                }}
                onClear={() => setNameFilter('')}
                aria-label={t('Search for a pipeline name')}
              />
            )}
          </ToolbarItem>
          <ToolbarItem>
            <Dropdown
              isOpen={importOpen}
              onOpenChange={setImportOpen}
              onSelect={() => setImportOpen(false)}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  variant="primary"
                  splitButtonItems={[
                    <MenuToggleAction
                      key="import"
                      id="import-pipeline"
                      onClick={() => {
                        /* Import stub — Fine Tuning sample pipelines omitted */
                      }}
                    >
                      {t('Import pipeline')}
                    </MenuToggleAction>,
                  ]}
                  onClick={() => setImportOpen(!importOpen)}
                  isExpanded={importOpen}
                  aria-label={t('Import pipeline options')}
                />
              )}
            >
              <DropdownList>
                <DropdownItem>{t('Upload new version')}</DropdownItem>
              </DropdownList>
            </Dropdown>
          </ToolbarItem>
          <ToolbarItem>
            <Dropdown
              isOpen={toolbarKebabOpen}
              onOpenChange={setToolbarKebabOpen}
              onSelect={() => setToolbarKebabOpen(false)}
              popperProps={{ position: 'right' }}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  variant="plain"
                  aria-label={t('Pipeline actions')}
                  onClick={() => setToolbarKebabOpen(!toolbarKebabOpen)}
                >
                  <EllipsisVIcon />
                </MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem isDisabled={selectedIds.size === 0}>{t('Delete')}</DropdownItem>
              </DropdownList>
            </Dropdown>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      {pageItems.length === 0 ? (
        <EmptyState titleText={t('No pipelines yet')} headingLevel="h2">
          <EmptyStateBody>
            {nameFilter || createdAfter
              ? t('No results match the filter criteria. Clear all filters and try again.')
              : t('Import a pipeline to get started.')}
          </EmptyStateBody>
          {(nameFilter || createdAfter) && (
            <Button variant="link" onClick={clearFilters}>
              {t('Clear all filters')}
            </Button>
          )}
        </EmptyState>
      ) : (
        <Table aria-label={t('Pipeline definitions')} variant="compact">
          <Thead>
            <Tr>
              <Th />
              <Th
                select={{
                  onSelect: (_e, isSelecting) => {
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      pageItems.forEach((p) => {
                        if (isSelecting) {
                          next.add(p.id);
                        } else {
                          next.delete(p.id);
                        }
                      });
                      return next;
                    });
                  },
                  isSelected: allPageSelected,
                }}
              />
              <Th>{t('Pipeline')}</Th>
              <Th>{t('Total versions')}</Th>
              <Th>{t('Created')}</Th>
              <Th>{t('Updated')}</Th>
              <Th screenReaderText={t('Actions')} />
            </Tr>
          </Thead>
          {pageItems.map((pipeline, rowIndex) => {
            const isExpanded = expandedIds.has(pipeline.id);
            return (
              <Tbody key={pipeline.id} isExpanded={isExpanded}>
                <Tr>
                  <Td
                    expand={{
                      rowIndex,
                      isExpanded,
                      onToggle: () => {
                        setExpandedIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(pipeline.id)) {
                            next.delete(pipeline.id);
                          } else {
                            next.add(pipeline.id);
                          }
                          return next;
                        });
                      },
                      expandId: `pipeline-expand-${pipeline.id}`,
                    }}
                  />
                  <Td
                    select={{
                      rowIndex,
                      onSelect: () => toggleSelected(pipeline.id),
                      isSelected: selectedIds.has(pipeline.id),
                    }}
                  />
                  <Td dataLabel={t('Pipeline')}>{pipeline.name}</Td>
                  <Td dataLabel={t('Total versions')}>{pipeline.totalVersions}</Td>
                  <Td dataLabel={t('Created')}>{formatDate(pipeline.createdAt)}</Td>
                  <Td dataLabel={t('Updated')}>{formatDate(pipeline.updatedAt)}</Td>
                  <Td isActionCell>
                    <Dropdown
                      isOpen={rowKebabId === pipeline.id}
                      onOpenChange={(open) => setRowKebabId(open ? pipeline.id : null)}
                      onSelect={() => setRowKebabId(null)}
                      popperProps={{ position: 'right' }}
                      toggle={(toggleRef) => (
                        <MenuToggle
                          ref={toggleRef}
                          variant="plain"
                          aria-label={t('Actions')}
                          onClick={() =>
                            setRowKebabId(rowKebabId === pipeline.id ? null : pipeline.id)
                          }
                        >
                          <EllipsisVIcon />
                        </MenuToggle>
                      )}
                    >
                      <DropdownList>
                        <DropdownItem>{t('Upload new version')}</DropdownItem>
                        <DropdownItem>{t('Create run')}</DropdownItem>
                        <DropdownItem>{t('Create schedule')}</DropdownItem>
                        <DropdownItem>{t('Delete pipeline')}</DropdownItem>
                      </DropdownList>
                    </Dropdown>
                  </Td>
                </Tr>
                <Tr isExpanded={isExpanded}>
                  <Td />
                  <Td noPadding colSpan={6} dataLabel={t('Versions')}>
                    <ExpandableRowContent>
                      <Table
                        aria-label={t('Pipeline versions')}
                        variant="compact"
                        isNested
                      >
                        <Thead>
                          <Tr resetOffset>
                            <Th
                              select={{
                                onSelect: (_e, isSelecting) => {
                                  setSelectedVersionIds((prev) => {
                                    const next = new Set(prev);
                                    pipeline.versions.forEach((version) => {
                                      if (isSelecting) {
                                        next.add(version.id);
                                      } else {
                                        next.delete(version.id);
                                      }
                                    });
                                    return next;
                                  });
                                },
                                isSelected:
                                  pipeline.versions.length > 0 &&
                                  pipeline.versions.every((version) =>
                                    selectedVersionIds.has(version.id),
                                  ),
                              }}
                            />
                            <Th>{t('Pipeline version')}</Th>
                            <Th>{t('Created')}</Th>
                            <Th />
                            <Th screenReaderText={t('Actions')} />
                          </Tr>
                        </Thead>
                        <Tbody>
                          {pipeline.versions.map((version, versionIndex) => (
                            <Tr key={version.id} resetOffset>
                              <Td
                                select={{
                                  rowIndex: versionIndex,
                                  onSelect: () => {
                                    setSelectedVersionIds((prev) => {
                                      const next = new Set(prev);
                                      if (next.has(version.id)) {
                                        next.delete(version.id);
                                      } else {
                                        next.add(version.id);
                                      }
                                      return next;
                                    });
                                  },
                                  isSelected: selectedVersionIds.has(version.id),
                                }}
                              />
                              <Td dataLabel={t('Pipeline version')}>{version.name}</Td>
                              <Td dataLabel={t('Created')}>{formatDate(version.createdAt)}</Td>
                              <Td>
                                <Button variant="link" isInline isDisabled>
                                  {t('View runs')}
                                </Button>
                              </Td>
                              <Td isActionCell>
                                <MenuToggle variant="plain" aria-label={t('Actions')} isDisabled>
                                  <EllipsisVIcon />
                                </MenuToggle>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </ExpandableRowContent>
                  </Td>
                </Tr>
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
        widgetId="pipelines-pagination"
      />
    </>
  );
};

export default PipelinesTable;
