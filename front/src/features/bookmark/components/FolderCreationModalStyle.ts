import styled from "styled-components";

export const Overlay = styled.div`
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
`;

export const ModalContainer = styled.div`
      width: 400px;
      height: 338px;
      padding: 10px 30px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;


// 폴더 생성 / 수정 제목 
export const FolderTitleBox = styled.div`
      text-align: center;
      font-size: 25px;
      font-weight: 700;
`;

// 폴더명 입력하는 칸
export const FolderNameInputBox = styled.input`
      width: 98%;
      height: 30px;
      margin-top: 10px;
      border: none;
      border-bottom: 1px solid #444444;;
      font-size: 16px;
      align-items: center;
`;

export const ErrorText = styled.p`
      margin-top: 5px;
      font-size: 13px;
      font-weight: 300;
      color: red;
`;

// 폴더 색상 선택 (전체 div)
export const FolderColorSelector = styled.div`
      margin-top: 35px; 

      label {
        font-size: 18px;
        font-weight: 600;
      }
`;

export const ColorOptions = styled.div` 
      margin-top: 8px;
      display: flex;
      gap: 0.5rem;
`;

// 하나의 폴더 색상 선택
export const ColorDot = styled.div<{ color : string; selected : boolean, checkImg : string}>`
      width: ${({ selected }) => (selected ? '35px' : '30px')};
      height: ${({ selected }) => (selected ? '35px' : '30px')};
      background: ${({ color }) => color};
      border-radius: 50%;
      position: relative;
      cursor: pointer;

      &::after {
          width: 29px;
          height: 29px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: '';
          display: ${({ selected }) => (selected ? 'block' : 'none')};
          background-image: ${({ checkImg }) => `url(${checkImg})`};
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          position: absolute;
      }
`;

// 취소/확인 버튼 그룹
export const FolderBtnGroup = styled.div`
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
`;

// 취소버튼
export const CancelBtn = styled.button`
      width: 45%;
      height: 48px;
      color: #997BEB;
      background: #ffffff;
      font-size: 16px;
      font-weight: 500;
      border: 1px solid #997BEB;
      border-radius: 10px;
      cursor: pointer;
`;

// 확인버튼
export const ConfirmBtn = styled.button`
      width: 45%;
      height: 48px;
      color: #ffffff;
      background: #997BEB;
      font-size: 16px;
      font-weight: 500;
      border: none;
      border-radius: 10px;
      cursor: pointer;
`;
