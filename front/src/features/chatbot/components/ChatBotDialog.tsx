import React, { useEffect, useRef, useState } from 'react';
import sendIcon from '../../../assets/images/send_purple.png';
import BotMessage from './BotMessage';
import * as s from './ChatBotDialogStyle';
import UserMessage from './UserMessage';


const ChatBotDialog: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<React.ReactNode[]>([]);
    const [selectedBtn, setSelectedBtn] = useState<'faq' | 'qna' | null>(null);
    const [inputText, setInputText] = useState('');

    const [faqOptions, setFaqOptions] = useState<string[]>([]); // FAQ 의도(intent) 옵션 리스트
    const [faqQuestions, setFaqQuestions] = useState<string[]>([]); // 의도 선택 후 질문(question) 리스트

    // 마지막 메시지 위치 추적용 ref
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // 채팅이 추가될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    // const handleSelectFAQ = () => {
    //     if (selectedBtn) return; 

    //     setSelectedBtn('faq');
    //     setChatHistory(prev => [
    //         ...prev,

    //         <s.SelectBtnWrapper key="selected-faq">
    //             <s.SelectBtn selected>FAQ</s.SelectBtn> 
    //         </s.SelectBtnWrapper>,

    //         // 챗봇 응답
    //         <BotMessage
    //             key={`faq-box-${prev.length}`}
    //             messages={['안녕하세요 FAQ는 아래 버튼을 선택해 주시면 안내 도와드릴게요.']}
    //         />,

    //         // FAQ 옵션 버튼 예시
    //         <s.SelectBtnWrapper key="faq-options">
    //             <s.OptionBtn>배송</s.OptionBtn>
    //             <s.OptionBtn>회원가입</s.OptionBtn>
    //             <s.OptionBtn>카테고리</s.OptionBtn>
    //             <s.OptionBtn>경매</s.OptionBtn>
    //         </s.SelectBtnWrapper>
    //     ]);
    // };

    // FAQ 버튼 클릭 -> 의도(intent) 목록 출력
    const handleSelectFAQ = async () => {
        if (selectedBtn) return;

        setSelectedBtn("faq");

        // 1) FAQ 선택 버튼 + 안내 메시지는 그대로 history에 넣기
        setChatHistory(prev => [
            ...prev,
            <s.SelectBtnWrapper key="selected-faq">
                <s.SelectBtn selected>FAQ</s.SelectBtn>
            </s.SelectBtnWrapper>,

            <BotMessage
                key={`faq-box-${prev.length}`}
                messages={['안녕하세요 FAQ는 아래 버튼을 선택해 주시면 안내 도와드릴게요.']}
            />
        ]);

        try {
            // 2) 백엔드에서 intent 목록 가져오기
            const response = await fetch("http://localhost:8080/api/intents", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            const data = await response.json();
            setFaqOptions(data); // DB에서 받아온 목록 저장

        } catch (error) {
            console.error("FAQ Intent fetch error", error);
        }
    };

    // 의도(intent) 클릭 -> 해당 질문(question) 목록 출력
    const handleSelectIntent = async (intent: string) => {
        // 클릭한 Intent도 말풍선처럼 표시
        setChatHistory(prev => [
            ...prev,
            <UserMessage key={`intent-${prev.length}`} content={intent} />,
        ]);

        // 의도(intent) 버튼 숨기기
        setFaqOptions([]);

        try {
            const response = await fetch(`http://localhost:8080/api/questions?intent=${intent}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            const data = await response.json();
            setFaqQuestions(data);
            // setFaqOptions(data); // 선택한 intent 에 대한 question만 표시

        } catch (err) {
            console.error(err);
        }
    };

    // 질문(question) 목록 클릭 -> 답변(answer) 받아서 말풍선 출력
    // const handleSelectQuestion = async (question: string) => {
    //     // 질문 클릭도 메시지로 출력
    //     setChatHistory(prev => [
    //         ...prev,
    //         <UserMessage key={`q-${prev.length}`} content={question} />,
    //     ]);

    //     try {
    //         const response = await fetch(`http://localhost:8080/api/answer?question=${question}`, {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    //             },
    //         });

    //         const data = await response.json(); // { answer: "..." }

    //         setChatHistory(prev => [
    //             ...prev,
    //             <BotMessage key={`a-${prev.length}`} messages={[data.answer]} />,
    //         ]);

    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleSelectQuestion = async (question: string) => {
        setChatHistory(prev => [
            ...prev,
            <UserMessage key={`question-${prev.length}`} content={question} />,
        ]);

        try {
            const response = await fetch(
                `http://localhost:8080/api/answer?question=${question}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            const data = await response.json();

            // 답변 출력
            setChatHistory(prev => [
                ...prev,
                <BotMessage key={`answer-${prev.length}`} messages={[data.answer]} />,
            ]);

            // 질문 리스트 제거
            setFaqQuestions([]);

            // 다시 intent 목록 불러오기
            const intentsResponse = await fetch(`http://localhost:8080/api/intents`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            const intents = await intentsResponse.json();

            // intent 버튼 다시 표시
            setFaqOptions(intents);

        } catch (err) {
            console.error(err);
        }
    };


    // QNA 선택
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


    // 세션 ID 생성 함수
    const getSessionId = () => {
        let id = localStorage.getItem("chat_session_id");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("chat_session_id", id);
        }
        return id;
    };


    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMessage = inputText;
        setChatHistory(prev => [
            ...prev,
            <UserMessage key={`user-${prev.length}`} content={userMessage} />,
        ]);
        setInputText('');

        try {
            // 백엔드(Spring Boot) 요청
            const response = await fetch("http://localhost:8080/api/chatbot/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // JWT 인증을 사용하는 경우 아래 주석 해제
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                    text: userMessage,
                    source: selectedBtn?.toUpperCase(), // FAQ 또는 QNA
                    sessionId: getSessionId(),          // ✨ 추가된 부분
                }),
            });

            const data = await response.json();
            console.log("📩 Chatbot response:", data);

            // 응답 형태: { answer: "...", intent: "...", confidence: 0.92 }
            const botMessage = data.answer || "답변을 불러오지 못했습니다.";

            setChatHistory(prev => [
                ...prev,
                <BotMessage key={`bot-${prev.length}`} messages={[botMessage]} />,
            ]);
        } catch (error) {
            console.error("Chatbot API error:", error);
            setChatHistory(prev => [
                ...prev,
                <BotMessage key={`bot-error-${prev.length}`} messages={["오류가 발생했습니다. 다시 시도해주세요."]} />,
            ]);
        }
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

                {/* {selectedBtn === 'faq' && faqOptions.length > 0 && (
                    <s.SelectBtnWrapper>
                        {faqOptions.map((intent, idx) => (
                            <s.OptionBtn key={idx}>{intent}</s.OptionBtn>
                        ))}
                    </s.SelectBtnWrapper>
                )} */}

                 {/* 의도(intent) 옵션 버튼 표시 */}
                {faqOptions.length > 0 && (
                    <s.SelectBtnWrapper>
                        {faqOptions.map((intent) => (
                            <s.OptionBtn key={intent} onClick={() => handleSelectIntent(intent)}>
                                {intent}
                            </s.OptionBtn>
                        ))}
                    </s.SelectBtnWrapper>
                )}

                {/* 질문(question) 옵션 버튼 표시 */}
                {faqQuestions.length > 0 && (
                    <s.SelectBtnWrapper>
                        {faqQuestions.map((q) => (
                            <s.OptionBtn key={q} onClick={() => handleSelectQuestion(q)}>
                                {q}
                            </s.OptionBtn>
                        ))}
                    </s.SelectBtnWrapper>
                )}

                {/* 마지막 메시지 위치 표시용 */}
                <s.ChatEndRef ref={chatEndRef} />

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
