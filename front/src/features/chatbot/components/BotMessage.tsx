import React from 'react';
import chatbotWhite from '../../../assets/images/chatbot_white.png';
import * as s from './ChatBotDialogStyle';

interface BotMessageProps {
    messages: string[];
}

const BotMessage: React.FC<BotMessageProps> = ({ messages }) => {
    return (
        <s.ChatBox>
            <s.ChatBotProfile src={chatbotWhite} alt="챗봇" />
            <s.ChatBotMessageBox>
                {messages.map((msg, idx) => (
                    <s.ChatBotMessage key={idx}>{msg}</s.ChatBotMessage>
                ))}
            </s.ChatBotMessageBox>
        </s.ChatBox>
    );
};

export default BotMessage;
