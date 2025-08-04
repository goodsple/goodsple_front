import type React from 'react';
import chatbotWhite from '../../../assets/images/chatbot_white.png';
import sendWhite from '../../../assets/images/send_white.png';
import * as s from './ChatBotIntroStyle';


interface ChatBotIntroProps {
    onStart: () => void;
}

const ChatBotIntro:React.FC<ChatBotIntroProps> = ({ onStart }) => {


    return(
       
                <s.ChatbotBody>
                    <s.Card>
                        <s.ChatBotProfile src = {chatbotWhite} alt="챗봇 작은 로고 이미지" />

                        <s.MessageWrapper>
                            <s.ChatbotMessage>
                                안녕하세요. <b>굿즈플</b>입니다.
                            </s.ChatbotMessage>

                            <s.ChatbotMessage>
                                오늘도 굿즈플을 이용해주셔서 감사해요.
                            </s.ChatbotMessage>

                            <s.ChatbotMessage>
                                문의사항은 아래 버튼을 선택해 주시면 안내 도와드릴게요.
                            </s.ChatbotMessage>
                                
                        </s.MessageWrapper>
                    </s.Card>

                    <s.ChatbotBtn onClick={onStart}>
                        문의하기<s.SendIcon src = {sendWhite} alt="문의하기" />
                    </s.ChatbotBtn>
                </s.ChatbotBody>
     
    )
}

export default ChatBotIntro;