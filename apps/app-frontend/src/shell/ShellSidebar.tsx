import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Label, Nav, NavGroup, NavItem, PageSidebar, PageSidebarBody } from '@patternfly/react-core';

import { useSession } from '@osac/ui-components/hooks/use-session';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';
import { shellNavIcon } from '@osac/ui-components/icons';

import { useAiVisionLayer } from './AiVisionLayerContext';
import { aiVisionNavIcon } from './AiVisionNavIcons';
import { type NavLink, navRowsForRole } from './shellNav';
import { isAiVisionNavItem, mergeAiVisionNav } from './shellNavAiVision';
import { RhUiAiExperienceIcon } from '../assets/ai-vision-icons/AiVisionIcons';

const ShellNavItem = ({
  item,
  isAiVisionLayer,
}: {
  item: NavLink;
  isAiVisionLayer: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showAiLabel = isAiVisionLayer && isAiVisionNavItem(item.id);
  const icon =
    (isAiVisionLayer ? aiVisionNavIcon(item.id) : undefined) ?? shellNavIcon(item.id);

  return (
    <NavItem
      itemId={item.id}
      icon={icon}
      isActive={location.pathname === item.path}
      to={item.path}
      onClick={(e) => {
        e.preventDefault();
        navigate(item.path);
      }}
    >
      {item.label}
      {showAiLabel ? (
        <>
          {' '}
          <Label isCompact color="purple" variant="outline" icon={<RhUiAiExperienceIcon />}>
            AI
          </Label>
        </>
      ) : null}
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
                <ShellNavItem
                  key={item.id}
                  item={item}
                  isAiVisionLayer={isAiVisionLayer}
                />
              ))}
            </NavGroup>
          ))}
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );
};
