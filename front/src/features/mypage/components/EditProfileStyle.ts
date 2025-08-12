import styled from "styled-components";
import * as s from '../../auth/components/SignUpStyle';

export const EditProfileContainer = styled(s.SignUpContainer)`
  
`;
export const ProfileImageWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
`;
export const ProfileImage = styled.div<{ isDefault?: boolean }>`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${({ isDefault }) => (isDefault ? '#D9D9D9' : 'none')}; 
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 25px;
    margin-top: 10px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        ${({ isDefault }) => isDefault && 'margin-top: 25px;'}
    }
`;

export const HiddenFileInput = styled.input`
    display: none;
`;

export const UploadButton = styled.button`
    color: #444;
    padding: 10px 20px;
    background:#fff;
    border:1px solid #9A9A9A;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
`;
export const PasswordToggleButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 135px;
    padding: 12px 16px;
    background: #444;
    border-radius: 10px;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 24px;
    border: none;
    font-size: 13px;

    img {
        width: 16px;
        height: 16px;
        transition: transform 0.3s;
        margin-left: 10px;
        vertical-align: bottom;
      }
    
      .rotate-up {
        transform: rotate(-90deg);
      }
    
      .rotate-down {
        transform: rotate(90deg);
      }
`;
export const PasswordForm = styled.form`
    margin-bottom: 32px;

    input {
        margin-top:7px;
    }
`;
export const GenderRow = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 24px;

    label {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    input {
        margin-right: 8px;
        width: 20px;
        height: 20px;
    }

    span {
        font-size: 14px;
        color: #9A9A9A;
    }
`;
export const WithdrawText = styled.p`
    margin-top: 32px;
    text-align: center;
    color: #444;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 30px;
`;

export const ReadOnlyInput = styled(s.SignUpInput)`
    background-color: #D9D9D9;
    color: #444;
    border: 1px solid #9A9A9A;
    transition: background-color 0.3s, color 0.3s;

    &:not([readonly]) {
        background-color: #fff;
        color: #444;
    }
`;

export const EditableInput = styled.input`
    background-color: #fff;
    color: #444;
    border: 1px solid #9A9A9A;
    transition: background-color 0.3s, color 0.3s;
`;