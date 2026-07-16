import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Flex,
  FlexItem,
  Label,
  Nav,
  NavGroup,
  NavItem,
  PageSidebar,
  PageSidebarBody,
} from '@patternfly/react-core';
import BrainIcon from '@patternfly/react-icons/dist/esm/icons/brain-icon';

import { useSession } from '@osac/ui-components/hooks/use-session';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';
import { shellNavIcon } from '@osac/ui-components/icons';

import { useAiVisionLayer } from './AiVisionLayerContext';
import { type NavLink, navRowsForRole } from './shellNav';
import { isAiVisionNavItem, mergeAiVisionNav } from './visionNav';

const ShellNavItem = ({ item }: { item: NavLink }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showAiLabel = isAiVisionNavItem(item.id);

  return (
    <NavItem
      itemId={item.id}
      icon={shellNavIcon(item.id)}
      isActive={location.pathname === item.path}
      to={item.path}
      onClick={(e) => {
        e.preventDefault();
        navigate(item.path);
      }}
    >
      {showAiLabel ? (
        <Flex
          spaceItems={{ default: 'spaceItemsSm' }}
          alignItems={{ default: 'alignItemsCenter' }}
          flexWrap={{ default: 'nowrap' }}
        >
          <FlexItem>{item.label}</FlexItem>
          <FlexItem>
            <Label isCompact color="purple" icon={<BrainIcon />}>
              AI
            </Label>
          </FlexItem>
        </Flex>
      ) : (
        item.label
      )}
    </NavItem>
  );
};

export const ShellSidebar = () => {
  const { role } = useSession();
  const { t } = useTranslation();
  const { isAiVisionLayer } = useAiVisionLayer();

  const navRows = React.useMemo(() => {
    const baseline = navRowsForRole(role, t);
    return mergeAiVisionNav(baseline, role, t, isAiVisionLayer);
  }, [role, t, isAiVisionLayer]);

  return (
    <PageSidebar>
      <PageSidebarBody isFilled>
        <Nav aria-label="Primary navigation">
          {navRows.map((section) => (
            <NavGroup key={section.sectionId} title={section.label}>
              {section.children.map((item) => (
                <ShellNavItem key={item.id} item={item} />
              ))}
            </NavGroup>
          ))}
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );
};
