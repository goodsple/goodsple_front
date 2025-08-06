import styled from "styled-components";

export const SignUpContainer = styled.div`
    width: 100vw;
    background: #FFFDFA;
    display: flex;
    justify-content: center;
`;

export const SignUpWrap = styled.div`
    padding: 40px;
    width: 600px;
    max-width: 90%;
    font-size: 16px;
    color:#444;
`;

export const SignUpTitle = styled.h2`
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 700;
`;

export const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const InputRow = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    align-items: center;
    width: 100%;
`;

export const SignUpLi = styled.span`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
`;

export const SignUpInput = styled.input`
    flex: 1;
    padding: 14px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    box-sizing: border-box;
    min-width: 0;
`;

export const SignUpDupli = styled.button`
    padding: 12px 16px;
    background: #fff;
    color: #997beb;
    border: 1px solid #997beb;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    width: 110px;
    flex-shrink: 0;
    margin-left: 20px;
    font-size: 13px;

    &.active {
      background: #997BEB;
      color: #fff;
      border: none;
    }
`;

export const RadioGroup = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 16px;

    label {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    input[type="radio"] {
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid #D9D9D9;
        border-radius: 50%;
        background: transparent;
        position: relative;
        cursor: pointer;
        vertical-align: middle;
    }
    
    input[type="radio"]:checked {
        background: #997beb;
        border: none;
    }

    input[type="radio"]:checked::after {
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #997beb;
        position: absolute;
        top: 2px;
        left: 2px;
    }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 22px;
    height: 22px;
    border: 2px solid #D9D9D9;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
  }

  input[type="checkbox"]:checked {
    background: #997beb;
    border-color: #997beb;
  }

  input[type="checkbox"]:checked::after {
    content: "✔";
    color: #fff;
    font-size: 16px;
    position: absolute;
    top: 0px;
    left: 3px;
  }

  label:first-child {
    padding-bottom: 20px;
    margin-bottom: 8px;
    border-bottom: 1px solid #d9d9d9;
  }

  label:last-child {
    padding-bottom: 20px;
    margin-bottom: 8px;
    border-bottom: 1px solid #d9d9d9;
  }

  button {
    margin-left: 8px;
    font-size: 12px;
    color: #D9D9D9;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const TermsContent = styled.div`
    background: #fafafa;
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #444;
`;

export const SignUpButton = styled.button`
    width: 100%;
    height: 60px;
    padding: 20px;
    background: #D9D9D9;
    border: none;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    border-radius: 10px;
    cursor: not-allowed;
    margin: 30px auto;

    &.active {
    background: #997BEB;
    color: #fff;
    border: none;
    cursor: pointer;
    }
`;

export const ErrorMessage = styled.p`
    color: #E03131;
    font-size: 12px;
    margin: -15px 0 12px 12px;
`;

export const CheckMessage = styled.p`
    color: #444;
    font-size: 12px;
    margin: -15px 0 12px 12px;
`;