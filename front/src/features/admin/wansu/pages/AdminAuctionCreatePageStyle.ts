import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
  /* background-color: #f8f9fa;  회색 배경 제거 */
  min-height: calc(100vh - 70px);
`;


export const ContentCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 15px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
  font-family: 'pretendard', sans-serif;

  /*  파일 선택 input의 테두리만 투명하게 처리 */
  &[type="file"] {
    border-color: transparent;
    padding-left: 0;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
  font-family: 'pretendard', sans-serif;
  resize: vertical;
`;

export const ImagePreviewWrapper = styled.div`
  position: relative;
  width: fit-content; /* 내용물 크기에 맞게 조절 */
  margin-top: 15px;
`;

export const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  object-fit: cover;
`;

export const ImageCancelButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f1f3f5;
`;

export const ActionButton = styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  background-color: #997BEB;
  color: white;
`;

export const ActionLink = styled(Link)`
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  background-color: #868e96;
  color: white;
  text-decoration: none;
  text-align: center;
`;