import type React from 'react';
import { useState, type KeyboardEvent } from 'react';
import Logo from '../../../assets/images/logo.png';
import sendIcon from '../../../assets/images/send_purple.png';
import * as s from './CommunityStyle';
import CommUserInfoModal from './CommUserInfoModal';

type MessageType = 'normal' | 'announcement';

interface ChatInputBoxProps {
    onSend : (message : string, type : MessageType) => void;
}

interface ChatMessage {
    text: string;
    type: MessageType;
    sender: 'me';
    userName: string;
    userProfile: string;
}

const Community:React.FC<ChatInputBoxProps> = ({}) => {

    const chatRooms = ['K-POP 채팅방', '영화/드라마 채팅방', '게임 채팅방', '애니메이션 채팅방'];
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [roomMessages, setRoomMessages] = useState<{ [room: string]: ChatMessage[] }>({});

    const [input, setInput] = useState<string>(''); 
    const [messageType, setMessageType] = useState<MessageType>('normal');

    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [selectedUserInfo, setSelectedUserInfo] = useState<{
        userName: string;
        userProfile: string;
        badgeName: string;
        badgeImage: string;
    } | null >(null);


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
                    userName: '홍길동', // 임시
                    userProfile: ''     // 임시
                };

                setRoomMessages(prev => ({
                    ...prev,
                    [selectedRoom]: [...(prev[selectedRoom] || []), newMessage]
                }));
            setInput('');
        }
    };

    const handleProfileClick = (msg: ChatMessage) => {
        setSelectedUserInfo({
            userName: msg.userName,
            badgeName: 'LV. 3 굿즈 수호자',
            badgeImage: '/assets/images/sample_badge.png', // 예시
            userProfile: msg.userProfile
        });
            setProfileModalOpen(true);
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
                            <s.ChatMessagesWrapper>
                                {(roomMessages[selectedRoom] || []).map((msg, idx) => (

                                <s.ChatMessageItem key={idx} isMine={msg.sender === 'me'}>
                                        <s.ProfileSection>
                                            <s.ProfileImage 
                                                src={msg.userProfile} 
                                                alt="프로필 이미지" 
                                                onClick={() => handleProfileClick(msg)}
                                            />
                                            <s.UserName>{msg.userName}</s.UserName>
                                        </s.ProfileSection>
                                    <s.ChatMessageBubble isMine={msg.sender === 'me'}>
                                        {msg.text}
                                    </s.ChatMessageBubble>
                                </s.ChatMessageItem>

                                ))}
                            </s.ChatMessagesWrapper>

                            {profileModalOpen && selectedUserInfo && (
                                <CommUserInfoModal
                                    userName={selectedUserInfo.userName}
                                    badgeName={selectedUserInfo.badgeName}
                                    badgeImage={selectedUserInfo.badgeImage}
                                    userProfile={selectedUserInfo.userProfile}
                                    onClose={() => setProfileModalOpen(false)}
                                />
                            )}

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
                                        maxLength={200}
                                    />

                                

                                    <s.SendButton onClick={handleSend}>
                                        <img src={sendIcon} alt="채팅 전송 버튼" />
                                    </s.SendButton>
                                </s.InputRow>

                                <s.AnnouncementCountMessage>
                                    <ul>
                                        <li>확성기 사용 → 한달에 2번 사용가능</li>
                                        {/* 확성기 사용 => 한달에 사용할 수 있는 횟수를 모두 사용하셨습니다! */}
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