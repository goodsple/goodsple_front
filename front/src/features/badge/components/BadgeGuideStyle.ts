import styled from "styled-components";

export const BadgeGuideContainer = styled.div`
    width: 100vw;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFDFA;
    color: #444444;

`;

export const BadgeGuideWrap = styled.div`
    width: 600px;
    padding-top : 100px;
`;

// 내 뱃지 정보 
export const MyBadgeInfoBox = styled.div`
    height: 200px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #9A9A9A;
    border-radius: 10px;
    background: #ffffffff;
    padding: 15px 0;

    img {
        width: 140px;
        display: block;
    }
`;

export const BadgeName = styled.div`
    font-size: 24px;
    font-weight: 500;

    b { 
        font-size: 24px;
        font-weight: 800;
    }
`;

export const BadgeScore = styled.div`
    margin-top: 15px;
    font-size: 20px;
    font-weight: 400;

    b { 
        font-size: 24px;
        font-weight: 800;
    }
`;

export const MyBadgeInfo = styled.div`
    margin-left: 20px;
`;

export const BadgeCard = styled.div`
    width: 450px;
    display:flex;
    align-items: center;
    height: 125px;
    margin-bottom: 15px;
`;

export const GaugeBar = styled.div`
    width: 70%;
    height: 25px;
    align-items: center;
    background-color: #e9e9e9ff;
    border-radius: 15px;
`;

export const GaugeFill = styled.div<{percent : number}> `
        width: ${({ percent }) => percent}%;
        height: 100%;
        background-color: #997BEB;
        border-radius: 10px;
        // transition: width 0.3s ease;
`;

export const NextBadgeGap = styled.div`
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    margin-top: 8px;
`;


// 뱃지 가이드 박스
export const BadgeGuideBox = styled.div`
    margin-bottom: 30px;
    padding: 20px 0;
    height: 700px;
    border: 1px solid #9A9A9A;
    border-radius: 10px;
    background: #ffffffff;
    align-items: center;
`;

export const BadgeInfo = styled.div`
    height: 125px;
    margin-left: 42px;
    display: flex;
    flex-directions: column;
    align-items: center;

    img{
        width: 110px;
    }
`;

export const BadgeInfoGuide = styled.div`
    align-items: center;
`;

export const ScoreRange = styled.div`
    font-weight: 500;
    font-size: 16px;
    margin-top: 7px;
`;

export const BadgeInfoText = styled.div`
    font-weight: 200;
    margin-top: 3px;
`;

export const StyledHr = styled.hr`
    width: 80%;
    border: 1px solid #dededeff;
`;


// 등급 점수는 어떻게 계산되나요? 
export const GradeScoreCalc = styled.button`
    margin-bottom: 30px;
    line-height: 4rem;
    width: 600px;
    border: 1px solid #9A9A9A;
    border-radius: 15px;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    color: #ffffffff;
    background: #997BEB;
`;

export const CalcInfo = styled.div`
    height: 500px;
    border: 1px solid #9A9A9A;
    border-top: none;
    border-radius: 0 0 15px 15px;
    background: #ffffffff;
    padding: 20px;
`;

export const CalcInfoText = styled.div`
    margin-top: 30px;
    line-height: 25px;

    b{
        font-weight: 800;
    }
`;

// 등급 점수 관련 자주 묻는 질문 
export const GradeScoreFAQ = styled.div`
    margin-bottom: 30px;
    padding-top: 20px;
    padding-left: 20px;
    height: 300px;
    border: 1px solid #9A9A9A;
    border-radius: 10px;
    background: #ffffffff;
`;

export const GradeScoreFAQTitle = styled.div`
    font-weight: 700;
    font-size: 24px;
`;

export const FaqItem = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-top: 27px;
`;

export const FaqAnswer = styled.div`
    width: 33rem;
    align-items: center;
    line-height: 30px;
    margin-top: 5px;
    padding: 6px 10px;
    border-radius: 10px;
    background: #dededeff;
    color: #6f6f6fff;
    font-size: 16px;
`;