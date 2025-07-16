import styled from "styled-components";
import * as s from "./SignUpStyle";

export const FindIdContainer = styled(s.SignUpContainer)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const EmailInputRow = styled(s.InputRow)`
    align-items: flex-start;
    gap: 16px;
`;

export const ButtonTimerBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TimerText = styled.p`
    font-size: 14px;
    font-weight : bold;
    color: #997BEB;
    margin-left: 12px;
`;

export const FoundIdBox = styled.div`
    margin-top: 24px;
    padding: 20px;
    background: #fff;
    border: 1px solid #9A9A9A;
    border-radius: 10px;
    font-size: 16px;
    text-align: center;

    strong {
    font-weight: 700;
    color: #444;
    }
`;
export const LoginButton = styled.button`
    margin-top: 16px;
    background: #444444;
    color: #fff;
    padding: 16px;
    width: 200px;
    border-radius: 10px;
    margin : 60px auto;
    font-size: 16px;
`;