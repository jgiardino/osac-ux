import { useState } from 'react';
import {
  Button,
  Checkbox,
  ClipboardCopy,
  Label,
  Popover,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Truncate,
} from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import { MOCK_MCP_SERVERS } from './mocks';
import type { MCPServer } from './types';

const statusLabel = (status: MCPServer['status']) => {
  switch (status) {
    case 'healthy':
      return (
        <Label status="success" variant="outline">
          Healthy
        </Label>
      );
    case 'error':
      return (
        <Label status="danger" variant="outline">
          Error
        </Label>
      );
    default:
      return (
        <Label variant="outline" color="grey">
          Unknown
        </Label>
      );
  }
};

const MCPTab = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = MOCK_MCP_SERVERS.filter((server) => {
    if (!search) {
      return true;
    }
    const q = search.toLowerCase();
    return (
      server.name.toLowerCase().includes(q) || server.description.toLowerCase().includes(q)
    );
  });

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <>
      <Toolbar id="aae-prod-mcp-toolbar">
        <ToolbarContent>
          <ToolbarItem>
            <SearchInput
              placeholder={t('Filter by name')}
              value={search}
              onChange={(_e, value) => setSearch(value)}
              onClear={() => setSearch('')}
              aria-label={t('Filter MCP servers')}
              id="aae-prod-mcp-search"
            />
          </ToolbarItem>
          {selected.size > 0 ? (
            <ToolbarItem>
              <Button variant="secondary" isDisabled id="aae-prod-mcp-try-playground">
                {t('Try in playground')} ({selected.size})
              </Button>
            </ToolbarItem>
          ) : null}
        </ToolbarContent>
      </Toolbar>

      <Table aria-label={t('MCP servers')} variant="compact" id="aae-prod-mcp-table">
        <Thead>
          <Tr>
            <Th screenReaderText={t('Select')} />
            <Th>{t('Name')}</Th>
            <Th>{t('Status')}</Th>
            <Th>{t('Endpoint')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filtered.map((server) => (
            <Tr key={server.id}>
              <Td>
                <Checkbox
                  id={`aae-prod-mcp-select-${server.id}`}
                  isChecked={selected.has(server.id)}
                  onChange={() => toggle(server.id)}
                  aria-label={t('Select {{name}}', { name: server.name })}
                />
              </Td>
              <Td dataLabel={t('Name')}>
                <div>
                  <strong>
                    <Truncate content={server.name} />
                  </strong>
                </div>
                <div className="pf-v6-u-font-size-sm pf-v6-u-color-200">{server.description}</div>
              </Td>
              <Td dataLabel={t('Status')}>{statusLabel(server.status)}</Td>
              <Td dataLabel={t('Endpoint')}>
                <Popover
                  headerContent={t('Endpoint')}
                  bodyContent={
                    <ClipboardCopy isReadOnly hoverTip={t('Copy')} clickTip={t('Copied')}>
                      {server.url}
                    </ClipboardCopy>
                  }
                >
                  <Button variant="link" isInline id={`aae-prod-mcp-endpoint-${server.id}`}>
                    {server.endpoint}
                  </Button>
                </Popover>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default MCPTab;
