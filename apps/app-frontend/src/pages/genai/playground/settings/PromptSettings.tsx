import { FormGroup, TextArea, Title } from '@patternfly/react-core';

import OsacForm from '@osac/ui-components/components/Form/OsacForm';
import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

interface PromptSettingsProps {
  systemInstruction: string;
  onSystemInstructionChange: (value: string) => void;
}

const PromptSettings = ({ systemInstruction, onSystemInstructionChange }: PromptSettingsProps) => {
  const { t } = useTranslation();

  return (
    <div className="pf-v6-u-p-md">
      <Title headingLevel="h5" size="md" className="pf-v6-u-mb-md">
        {t('Prompt')}
      </Title>
      <OsacForm isResponsive={false}>
        <FormGroup fieldId="playground-system-instruction" label={t('System instructions')}>
          <TextArea
            id="playground-system-instruction"
            value={systemInstruction}
            onChange={(_e, value) => onSystemInstructionChange(value)}
            resizeOrientation="vertical"
            rows={8}
            aria-label={t('System instructions')}
          />
        </FormGroup>
      </OsacForm>
    </div>
  );
};

export default PromptSettings;
