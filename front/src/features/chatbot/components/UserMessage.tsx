import React from 'react';
import * as s from './ChatBotDialogStyle';

interface UserMessageProps {
    content: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <s.UserMessage>{content}</s.UserMessage>
        </div>
    );
};

export default UserMessage;
