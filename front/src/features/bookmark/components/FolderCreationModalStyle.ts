import styled from "styled-components";

// export const FolderCreationContainer = styled.div`

// `;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  width: 400px;
  height: 335px;
  background: white;
  padding: 10px 30px;
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
      font-size: 16px;
      margin-top: 10px;
      border: none;
      border-bottom: 1px solid #444444;;
      align-items: center;
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
      border-radius: 50%;
      background: ${({ color }) => color};
      cursor: pointer;
      position: relative;

       &::after {
          content: '';
          display: ${({ selected }) => (selected ? 'block' : 'none')};
          width: 29px;
          height: 29px;
          background-image: ${({ checkImg }) => `url(${checkImg})`};
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
      }
`;

// 취소/확인 버튼 그룹
export const FolderBtnGroup = styled.div`
      display: flex;
      justify-content: space-between;
      margin-top: 35px;
`;

// 취소버튼
export const CancelBtn = styled.button`
      width: 45%;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      color: #997BEB;
      background: #ffffff;
      border: 1px solid #997BEB;
      border-radius: 10px;
      cursor: pointer;
`;

// 확인버튼
export const ConfirmBtn = styled.button`
      width: 45%;
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      background: #997BEB;
      border: none;
      border-radius: 10px;
      cursor: pointer;
`;
