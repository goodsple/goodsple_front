import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(90deg, #997BEB, #F8FFC7);
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const LoginWrap = styled.div`
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    padding: 40px 40px 60px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    width: 360px;
    font-size:16px;
`;
export const Logo = styled.div`
    text-align: center;
    margin-bottom: 24px;

    img {
        width: 160px;
    }
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
export const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    box-sizing: border-box;
`;
export const LoginButton = styled.button`
    width: 100%;
    padding: 12px;
    background: #997beb;
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top:10px;
`;
export const LinkList = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 16px;
    margin-top:5px;
    a {
    color: #888;
    text-decoration: none;
    }
`;
export const KakaoButton = styled.button`
    width: 100%;
    padding: 12px;
    background: #FEE500;
    color: #000;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    img {
        width: 20px;
        height: 20px;
      }
`;