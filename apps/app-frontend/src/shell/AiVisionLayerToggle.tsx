import { Label, Switch, ToolbarItem } from '@patternfly/react-core';
import BrainIcon from '@patternfly/react-icons/dist/esm/icons/brain-icon';

import { useAiVisionLayer } from './AiVisionLayerContext';

/** Demo-only masthead control for the AI vision nav/routes overlay. */
export const AiVisionLayerToggle = () => {
  const { isAiVisionLayer, setAiVisionLayer } = useAiVisionLayer();

  return (
    <>
      {isAiVisionLayer && (
        <ToolbarItem>
          <Label color="purple" icon={<BrainIcon />}>
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
