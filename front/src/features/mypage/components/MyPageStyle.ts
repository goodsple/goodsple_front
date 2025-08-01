import { Link } from "react-router-dom";
import styled from "styled-components";

export const MyPageContainer = styled.div`
        width: 100vw;
        min-height: 100vh;
        padding-top : 80px;
        padding-bottom: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #FFFDFA;
        color: #444444;
`;

// 위 박스 => 프로필 정보 

export const ProfileSection = styled.div`
        width: 90%;           
        max-width: 960px; 
        height: 450px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #9A9A9A;
        border-radius: 15px;
`;

export const MyProfile = styled.div`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 24px;
        font-weight: 500;
        margin-top: 15px;
`;

export const profileBadge = styled.div`
        line-height: 45px;  
        font-size: 16px;
        display: flex;
        margin-top: 10px;

        img {
            width: 45px;
        }
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
        margin-bottom: 20px;
        margin-top: 10px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        ${({ isDefault }) => isDefault && 'margin-top: 25px;'}
    }
`;

export const EditProfileButton = styled.button`
        width: 150px;
        line-height: 30px;
        color: #444444;
        background-color: #ffffff;
        font-size: 16px;
        text-align: center;
        margin-top: 35px;
        border: 2px solid #997BEB;
        border-radius: 10px;
        cursor: pointer;
`;

// 게시글 / 북마크 / 후기  => 정보 나타내는 박스 
export const outProfileInfo = styled.div`
        display: flex;
        align-items: center;
        margin-top: 45px;
`;
 
export const stasItem = styled(Link)` 
        width: 50px;
        font-size: 16px;
        text-align: center;
        cursor: pointer;

        color: inherit;
        text-decoration: none;
        display: block;
        
        &:nth-child(2) {
            margin: 0 180px;
        }

        &:hover {
            color: #997BEB; 
        }            
`;

export const stasNum = styled.div`
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 5px;
`;

// ---------------------------------------------------------------
// 아래 박스 => 나의활동 / 거래 관리 / 내 계정 관리

export const LinkList = styled.div`
        width: 50vw;
        height: 30vh;
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
`;

// 하나의 박스
export const Activity = styled.div`
        width: 30vw;
        height: 310px;
        background-color: #ffffff;
        border: 1px solid #9A9A9A;
        border-radius: 15px;

        &:nth-child(2) {
            margin: 0 10px;
        }
`;

// 박스 안 큰 제목
export const ActivityHeader = styled.div`
        padding: 20px 0 10px 13px ;
        font-size: 20px;
        font-weight: 700;
        
`;

export const StyledHr = styled.hr`
        width: 100%;             
        max-width: 95%; 
        border: none;
        border-top: 3px solid #997BEB;
`;

// 박스 안 링크들 
export const ActivityLink = styled(Link)`
        width: 300px; 
        line-height: 30px;
        padding-left: 13px;
        margin-top: 10px; 
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;

        color: inherit;
        text-decoration: none;
        display: block;

        &:hover {
            color: #997BEB;          
        }
`;

export const NonData = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #444;
`;
