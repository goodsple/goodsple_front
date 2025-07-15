import styled from "styled-components";

export const ErrorContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(90deg, #997BEB, #F8FFC7);
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const ErrorContent = styled.div`
    text-align: center;
    color: #444;

    h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
    }

    p {
    font-size: 16px;
    margin-bottom: 24px;
    }

    button {
    padding: 12px 24px;
    background: #997BEB;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #7d66d6;
    }
    }
`;