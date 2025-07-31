import type React from 'react';
import { useState, type KeyboardEvent } from 'react';
import sendIcon from '../../../assets/images/comm_send.png';
import Logo from '../../../assets/images/logo.png';
import * as s from './CommunityStyle';

type MessageType = 'normal' | 'announcement';

interface ChatInputBoxProps {
    onSend : (message : string, type : MessageType) => void;
}

interface ChatMessage {
    text: string;
    type: MessageType;
    sender: 'me';
}

const Community:React.FC<ChatInputBoxProps> = ({onSend}) => {

    const chatRooms = ['K-POP 채팅방', '영화/드라마 채팅방', '게임 채팅방', '애니메이션 채팅방'];
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [roomMessages, setRoomMessages] = useState<{ [room: string]: ChatMessage[] }>({});

    const [input, setInput] = useState<string>(''); 
    const [messageType, setMessageType] = useState<MessageType>('normal');


    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (input.trim() && selectedRoom) {
                const newMessage: ChatMessage = {
                    text: input.trim(),
                    type: messageType,
                    sender: 'me',
                };

                setRoomMessages(prev => ({
                    ...prev,
                    [selectedRoom]: [...(prev[selectedRoom] || []), newMessage]
                }));
            onSend(input.trim(), messageType);
            setInput('');
        }
    };

    return (
        <s.CommunityContainer>
            <s.CommunityChatLayout>
                {/* 채팅방 리스트 */}
                <s.ChatRoomList>
                    <img src={Logo} alt="로고" />
                    <s.StyledHr />
                    <ul>
                        {chatRooms.map((room, idx) => (
                            <s.ChatRoomItem
                                        key={idx}
                                        selected={selectedRoom === room}
                                        onClick={() => setSelectedRoom(room)}
                                >
                                    {room}
                            </s.ChatRoomItem>
                        ))}
                    </ul>
                </s.ChatRoomList>

                {/* 채팅 메시지 영역 */}
                <s.ChatMessageArea>
                    {!selectedRoom ? (
                        <s.EmptyMessageArea>
                            채팅방을 눌러 채팅에 참여하세요!
                        </s.EmptyMessageArea>
                    ) : (
                        <>
                            {/* (추후 메시지 목록 등 들어올 자리) */}
                            {(roomMessages[selectedRoom] || []).map((msg, idx) => (
                                <s.ChatMessageBubble key={idx} isMine={msg.sender === 'me'}>
                                    {msg.text}
                                </s.ChatMessageBubble>
                            ))}

                            {/* 입력창 */}
                            <s.ChatInputBox>

                                <s.InputRow>
                                    <s.MessageTypeToggle>
                                        <s.TypeButton
                                            selected={messageType === 'normal'}
                                            onClick={() => setMessageType('normal')}
                                            >
                                            일반
                                        </s.TypeButton>
                                        <s.TypeButton
                                            selected={messageType === 'announcement'}
                                            onClick={() => setMessageType('announcement')}
                                            >
                                            확성기
                                        </s.TypeButton>
                                    </s.MessageTypeToggle>

                                    <s.ChatTextarea
                                        placeholder="메시지를 입력해주세요. (Shift + Enter 로 줄바꿈)"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />

                                

                                    <s.SendButton onClick={handleSend}>
                                        <img src={sendIcon} alt="채팅 전송 버튼" />
                                    </s.SendButton>
                                </s.InputRow>

                                <s.AnnouncementCountMessage>
                                    <ul>
                                        <li>확성기 사용 → 한달에 2번 사용가능</li>
                                    </ul>
                                </s.AnnouncementCountMessage>
                            </s.ChatInputBox>
                        </>
                    )}
                </s.ChatMessageArea>
            </s.CommunityChatLayout>
        </s.CommunityContainer>
    );
};


export default Community;