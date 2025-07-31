import styled from "styled-components";
import * as s from "../../../features/auth/components/SignUpStyle";

export const ReportContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

export const ReportWrap = styled.div`
    width: 420px;
    max-width: 90%;
    background: white;
    padding: 24px 40px;
    border-radius: 15px;
`;
export const ReportTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
`;
export const ReportList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
`;
export const ReasonButton = styled.button<{ $selected: boolean }>`
    border: 1px solid #997beb;
    color: ${({ $selected }) => ($selected ? "#fff" : "#9A9A9A")};
    background: ${({ $selected }) => ($selected ? "#997beb" : "#fff")};
    padding: 12px;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size:16px;
`;
export const ReportTextArea = styled.textarea`
    width: 100%;
    height: 100px;
    border: 1px solid #997beb;
    padding: 12px;
    border-radius: 10px;
    resize: none;
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 1.4;
    box-sizing: border-box;
`;
export const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
`;
export const CancelButton = styled.button`
    flex: 1;
    padding: 12px;
    border: 1px solid #997BEB;
    color: #997BEB;
    background: white;
    border-radius: 10px;
    font-size:16px;
    cursor: pointer;  
`;
export const ReportButton = styled.button<{ disabled?: boolean }>`
    flex: 1;
    padding: 12px;
    border: none;
    background: ${({ disabled }) => (disabled ? "#D9D9D9" : "#997beb")};
    color: white;
    font-size:16px;
    border-radius: 10px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const ErrorMessage = styled(s.ErrorMessage)`
    margin: -10px 0 8px 8px;
`