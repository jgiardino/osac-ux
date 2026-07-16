import { Label, Switch, ToolbarItem } from '@patternfly/react-core';

import { useAiVisionLayer } from './AiVisionLayerContext';
import { RhUiAiExperienceIcon } from '../assets/ai-vision-icons/AiVisionIcons';

/** Demo-only masthead control for the AI vision nav/routes overlay. */
export const AiVisionLayerToggle = () => {
  const { isAiVisionLayer, setAiVisionLayer } = useAiVisionLayer();

  return (
    <>
      {isAiVisionLayer && (
        <ToolbarItem>
          <Label color="purple" icon={<RhUiAiExperienceIcon />}>
            AI vision
          </Label>
        </ToolbarItem>
      )}
      <ToolbarItem>
        <Switch
          id="ai-vision-layer-toggle"
          label="AI vision layer"
          isReversed
          isChecked={isAiVisionLayer}
          onChange={(_e, checked) => setAiVisionLayer(checked)}
          ouiaId="ai-vision-layer-toggle"
        />
      </ToolbarItem>
    </>
  );
};
