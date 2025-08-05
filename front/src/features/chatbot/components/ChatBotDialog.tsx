import React, { useState } from 'react';
import chatbotWhite from '../../../assets/images/chatbot_white.png';
import sendIcon from '../../../assets/images/comm_send.png';
import * as s from './ChatBotDialogStyle';

const ChatBotDialog: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<React.ReactNode[]>([]);
    const [selectedBtn, setSelectedBtn] = useState<'faq' | 'qna' | null>(null);
    const [inputText, setInputText] = useState('');

    const handleSelectFAQ = () => {
        if (selectedBtn) return; 

        setSelectedBtn('faq');
        setChatHistory(prev => [
            ...prev,

            <s.SelectBtnWrapper key="selected-faq">
                <s.SelectBtn selected>FAQ</s.SelectBtn> 
            </s.SelectBtnWrapper>,

            // 챗봇 응답
            <s.ChatBox key={`faq-box-${prev.length}`}>
                <s.ChatBotProfile src={chatbotWhite} alt="챗봇" />
                <s.ChatBotMessageBox>
                    <s.ChatBotMessage>
                        안녕하세요 FAQ는 아래 버튼을 선택해 주시면 안내 도와드릴게요.
                    </s.ChatBotMessage>
                </s.ChatBotMessageBox>
            </s.ChatBox>,

            // FAQ 옵션 버튼 예시
            <s.SelectBtnWrapper key="faq-options">
                <s.OptionBtn>배송</s.OptionBtn>
                <s.OptionBtn>회원가입</s.OptionBtn>
                <s.OptionBtn>카테고리</s.OptionBtn>
                <s.OptionBtn>경매</s.OptionBtn>
            </s.SelectBtnWrapper>
        ]);
    };

    const handleSelectQNA = () => {
        if (selectedBtn) return; 

        setSelectedBtn('qna');
        setChatHistory(prev => [
            ...prev,

            <s.SelectBtnWrapper key="selected-qna">
                <s.SelectBtn selected>QNA</s.SelectBtn>
            </s.SelectBtnWrapper>,

            // 챗봇 응답
            <s.ChatBox key={`qna-box-${prev.length}`}>
                <s.ChatBotProfile src={chatbotWhite} alt="챗봇" />
                <s.ChatBotMessageBox>
                    <s.ChatBotMessage>
                        어떤 도움이 필요하신가요? 궁금한 점을 자유롭게 질문해 주세요!
                    </s.ChatBotMessage>
                </s.ChatBotMessageBox>
            </s.ChatBox>
        ]);
    };

    return (
        <s.ChatbotBody>
            <s.ChatArea>

                <s.ChatBox>
                    <s.ChatBotProfile src={chatbotWhite} alt="챗봇 작은 로고 이미지" />
                    <s.ChatBotMessageBox>
                        <s.ChatBotMessage>
                            안녕하세요 <b>굿즈플</b>입니다.
                        </s.ChatBotMessage>
                        <s.ChatBotMessage>
                            오늘도 굿즈플을 이용해주셔서 감사해요.
                        </s.ChatBotMessage>
                        <s.ChatBotMessage>
                            문의사항은 아래 버튼을 선택해 주시면 안내 도와드릴게요.
                        </s.ChatBotMessage>
                    </s.ChatBotMessageBox>
                </s.ChatBox>

                {/* FAQ / QNA 선택 버튼 */}
                {!selectedBtn && (
                    <s.SelectBtnWrapper>
                        <s.SelectBtn onClick={handleSelectFAQ}>FAQ</s.SelectBtn>
                        <s.SelectBtn onClick={handleSelectQNA}>QNA</s.SelectBtn>
                    </s.SelectBtnWrapper>
                )}

                {chatHistory.map((msg, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'flex-end' }}>{msg} </div>
                ))}

            </s.ChatArea>

            {/* 입력창 */}
            {(selectedBtn === 'faq' || selectedBtn === 'qna') && ( 
                <s.InputBoxWrapper>
                    <s.InputField
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="문의하실 내용을 입력해주세요."
                    />
                    <s.SendBtn
                        onClick={() => {
                            if (!inputText.trim()) return;
                            setChatHistory((prev) => [
                                ...prev,
                                <s.UserMessage key={`user-${prev.length}`}>{inputText}</s.UserMessage>,
                            ]);
                            setInputText('');
                        }}
                    >
                        <img src={sendIcon} alt='보내기 아이콘' />
                    </s.SendBtn>
                </s.InputBoxWrapper>
            )}

        </s.ChatbotBody>
    );
};

export default ChatBotDialog;
