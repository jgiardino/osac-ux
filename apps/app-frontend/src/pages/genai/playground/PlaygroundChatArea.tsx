import {
  Chatbot,
  ChatbotContent,
  ChatbotDisplayMode,
  ChatbotFooter,
  ChatbotWelcomePrompt,
  MessageBar,
  MessageBox,
} from '@patternfly/chatbot';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

interface PlaygroundChatAreaProps {
  message: string;
  onMessageChange: (value: string) => void;
  modelName: string;
}

/**
 * Chat chrome via @patternfly/chatbot (same library as odh-dashboard Playground).
 * Send is a no-op — comparison port, not a live/simulated conversation.
 */
const PlaygroundChatArea = ({ message, onMessageChange, modelName }: PlaygroundChatAreaProps) => {
  const { t } = useTranslation();

  return (
    <Chatbot displayMode={ChatbotDisplayMode.embedded}>
      <ChatbotContent>
        <MessageBox>
          <ChatbotWelcomePrompt
            title={t('Hello, Ask a question or make a request below')}
            description={`${t('Model')}: ${modelName}`}
          />
        </MessageBox>
      </ChatbotContent>
      <ChatbotFooter>
        <MessageBar
          onSendMessage={() => {
            /* layout-only: no send/stream */
          }}
          hasAttachButton={false}
          hasMicrophoneButton={false}
          alwayShowSendButton
          isSendButtonDisabled
          value={message}
          onChange={(_e, value) => {
            if (typeof value === 'string') {
              onMessageChange(value);
            }
          }}
          placeholder={t('Send a message...')}
        />
      </ChatbotFooter>
    </Chatbot>
  );
};

export default PlaygroundChatArea;
