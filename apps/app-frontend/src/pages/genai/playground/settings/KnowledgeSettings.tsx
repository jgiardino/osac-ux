import { Content, ContentVariants, Switch, Title } from '@patternfly/react-core';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

interface KnowledgeSettingsProps {
  ragEnabled: boolean;
  onRagEnabledChange: (enabled: boolean) => void;
}

const KnowledgeSettings = ({ ragEnabled, onRagEnabledChange }: KnowledgeSettingsProps) => {
  const { t } = useTranslation();

  return (
    <div className="pf-v6-u-p-md">
      <Title headingLevel="h5" size="md" className="pf-v6-u-mb-md">
        {t('Knowledge')}
      </Title>
      <Switch
        id="playground-rag-enabled"
        label={t('Use knowledge')}
        isChecked={ragEnabled}
        onChange={(_e, checked) => onRagEnabledChange(checked)}
      />
      <Content component={ContentVariants.small} className="pf-v6-u-mt-md pf-v6-u-color-200">
        {t('Add knowledge sources to ground responses with your documents.')}
      </Content>
    </div>
  );
};

export default KnowledgeSettings;
