import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowLeftPurple from '../../../assets/images/arrow_left_purple.png';
import chatbot from '../../../assets/images/chatbot.png';
import megaphoneIcon from '../../../assets/images/megaphone_purple.png';
import ChatBotDialog from './ChatBotDialog';
import ChatBotIntro from './ChatBotIntro';
import * as s from './ChatBotPageStyle';


const ChatBotPage:React.FC = () => {

    const navigate = useNavigate();

    const [chatStarted, setChatStarted] = useState(false);
    const [messages, setMessages] = useState([]);
    const scrollable = messages.length > 2;

    const handleRefresh = () => {
        window.location.reload();
    };

    // comm_send 이미지 => 이름 send_purple 로 수정하기
    return(

        <s.ChatBotContainer>
            <s.ChatBotWrapper>
                <s.ChatbotHeader>
                    {/* 뒤로가기 버튼 + 작은 로고 + 로고 이름 */}
                    <s.ArrowLeftIcon src = {arrowLeftPurple} onClick={handleRefresh} alt="뒤로가기 버튼" />
                    <s.ChatBotSmallIcon src = {chatbot} alt="챗봇 작은 로고 이미지" />
                    Goodsple
                </s.ChatbotHeader>

                <s.ChatbotAlarmBox>
                    {/* 확성기 이미지 */} 
                    <s.MegaphoneIcon src = {megaphoneIcon} alt="확성기 아이콘" />
                    궁금한점은 언제든 질문하세요.
                </s.ChatbotAlarmBox>

                <s.ChatScrollArea scrollable={scrollable}>
                    <s.ChatbotGreeting>
                        {/* 큰 로고 이미지 */}
                        <s.ChatBotBigLogo src = {chatbot} alt="챗봇 큰 로고 이미지" />
                        굿즈플에게 문의하기
                    </s.ChatbotGreeting>

                    <s.ChatbotTransitionWrapper>
                        <s.FadeBox visible={!chatStarted}>
                            <ChatBotIntro onStart={() => setChatStarted(true)} />
                        </s.FadeBox>
                        <s.FadeBox visible={chatStarted}>
                            <ChatBotDialog />
                        </s.FadeBox>
                    </s.ChatbotTransitionWrapper>
                </s.ChatScrollArea>
            </s.ChatBotWrapper>
        </s.ChatBotContainer>

    )
}

export default ChatBotPage;