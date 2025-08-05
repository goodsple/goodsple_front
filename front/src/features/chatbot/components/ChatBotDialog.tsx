import React, { useState } from 'react';
import sendIcon from '../../../assets/images/send_purple.png';
import BotMessage from './BotMessage';
import * as s from './ChatBotDialogStyle';
import UserMessage from './UserMessage';


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
            <BotMessage
                key={`faq-box-${prev.length}`}
                messages={['안녕하세요 FAQ는 아래 버튼을 선택해 주시면 안내 도와드릴게요.']}
            />,

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
            <BotMessage
                key={`qna-box-${prev.length}`}
                messages={['어떤 도움이 필요하신가요? 궁금한 점을 자유롭게 질문해 주세요!']}
            />
        ]);
    };

    const handleSend = () => {
        if (!inputText.trim()) return;
        setChatHistory(prev => [
            ...prev,
            <UserMessage key={`user-${prev.length}`} content={inputText} />
        ]);
        setInputText('');
    };

    return (
        <s.ChatbotBody>
            <s.ChatArea>

                 <BotMessage
                    messages={[
                        '안녕하세요 굿즈플입니다.',
                        '오늘도 굿즈플을 이용해주셔서 감사해요.',
                        '문의사항은 아래 버튼을 선택해 주시면 안내 도와드릴게요.'
                    ]}
                />

                {/* FAQ / QNA 선택 버튼 */}
                {!selectedBtn && (
                    <s.SelectBtnWrapper>
                        <s.SelectBtn onClick={handleSelectFAQ}>FAQ</s.SelectBtn>
                        <s.SelectBtn onClick={handleSelectQNA}>QNA</s.SelectBtn>
                    </s.SelectBtnWrapper>
                )}

                {chatHistory.map((msg, idx) => (
                    <React.Fragment key={idx}>{msg}</React.Fragment>
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
                   <s.SendBtn onClick={handleSend}>
                        <img src={sendIcon} alt="보내기 아이콘" />
                    </s.SendBtn>
                </s.InputBoxWrapper>
            )}

        </s.ChatbotBody>
    );
};

export default ChatBotDialog;
