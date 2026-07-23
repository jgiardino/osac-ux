import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  List,
  ListItem,
} from '@patternfly/react-core';
import { ExpandableRowContent, Td, Tr } from '@patternfly/react-table';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

import type { WorkbenchRow } from './types';

interface ExpandedWorkbenchRowProps {
  workbench: WorkbenchRow;
  isExpanded: boolean;
  /** Expand + visible columns through Actions */
  columnCount: number;
}

/**
 * Mirrors odh-dashboard ExpandedWorkspaceRow: DescriptionLists placed under
 * Name / Image / Pod config columns — not a nested table.
 */
const ExpandedWorkbenchRow = ({
  workbench,
  isExpanded,
  columnCount,
}: ExpandedWorkbenchRowProps) => {
  const { t } = useTranslation();

  return (
    <Tr isExpanded={isExpanded}>
      {Array.from({ length: columnCount }, (_, index) => {
        if (index === 1) {
          return (
            <Td key="storage" dataLabel={t('Storage')}>
              <ExpandableRowContent>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Home volume')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {workbench.homeVolume || t('None')}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Data volumes')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {workbench.dataVolumes.length > 0 ? (
                        <List isPlain>
                          {workbench.dataVolumes.map((volume) => (
                            <ListItem key={volume}>{volume}</ListItem>
                          ))}
                        </List>
                      ) : (
                        t('None')
                      )}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </ExpandableRowContent>
            </Td>
          );
        }
        if (index === 2) {
          return (
            <Td key="packages" dataLabel={t('Packages')}>
              <ExpandableRowContent>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Packages')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {workbench.packages.length > 0 ? (
                        <List isPlain>
                          {workbench.packages.map((pkg) => (
                            <ListItem key={pkg}>{pkg}</ListItem>
                          ))}
                        </List>
                      ) : (
                        t('No package information available')
                      )}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </ExpandableRowContent>
            </Td>
          );
        }
        if (index === 3) {
          return (
            <Td key="config" dataLabel={t('Configuration')}>
              <ExpandableRowContent>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('CPU')}</DescriptionListTerm>
                    <DescriptionListDescription>{workbench.cpu}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Memory')}</DescriptionListTerm>
                    <DescriptionListDescription>{workbench.memory}</DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </ExpandableRowContent>
            </Td>
          );
        }
        return <Td key={`empty-${index}`} />;
      })}
    </Tr>
  );
};

export default ExpandedWorkbenchRow;
