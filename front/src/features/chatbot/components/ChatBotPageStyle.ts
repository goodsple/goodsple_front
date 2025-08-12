import styled from "styled-components";

export const ChatBotContainer = styled.div`
        width: 100vw;
        height: 95vh;
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: column;
`;

export const ChatBotWrapper = styled.div`
        width: 530px;
        height: 750px;
        margin: auto;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

        /* ⭐️ 추가: Flexbox 레이아웃으로 변경 */
        display: flex;
        flex-direction: column;
        // overflow: hidden;
`;


export const ChatbotHeader = styled.div`
        width: 90%;
        height: 80px;
        font-size: 24px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
`;

export const ChatBotSmallIcon = styled.img`
        width: 50px;
`;

export const ArrowLeftIcon = styled.img`
        width: 20px;
        height: 30px;
        margin: 10px;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
`;

export const ChatbotAlarmBox = styled.div`
        width: 90%;
        line-height: 45px;
        padding: 0 15px;
        margin: 0 auto;
        margin-bottom: 40px;
        color: #7F7E7D;
        background: #EDECEB;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
`;

export const MegaphoneIcon = styled.img`
        width: 30px;
`;

export const ChatbotGreeting = styled.div`
        font-size: 24px;
        font-weight: 700;           
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: column;
`;

export const ChatBotBigLogo = styled.img`
        width: 120px;
        margin-bottom: 15px;
`;


export const ChatbotTransitionWrapper = styled.div`
        width: 100%;
        position: relative;
        height: 100%;
`;

export const FadeBox = styled.div<{ visible: boolean }>`
        position: absolute;
        width: 100%;
        height: 100%; // 추가⭐️
        top: 0;
        left: 0;

        opacity: ${(props) => (props.visible ? 1 : 0)};
        transform: ${(props) => (props.visible ? 'translateY(0)' : 'translateY(-10px)')};
        pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
        z-index: ${(props) => (props.visible ? 2 : 1)};
        transition: opacity 0.7s ease, transform 0.7s ease;
`;

export const ChatScrollArea = styled.div<{ scrollable: boolean }>`
        flex: 1; /* 남은 공간 채우기 */
        // min-height: 0; /* ⭐️ flex 컨테이너에서 스크롤 정상 작동 */
        // padding: 20px 20px 80px; /* 아래쪽 패딩은 입력창 높이만큼 */
        display: flex;
        flex-direction: column;
        gap: 10px;

        overflow-y: ${({ scrollable }) => (scrollable ? 'auto' : 'hidden')};
`;



