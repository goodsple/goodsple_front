import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 70px);
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  margin: 0 0 20px 0;
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
`;

export const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
  font-family: 'pretendard', sans-serif;
  resize: vertical;
`;

export const ImagePreview = styled.img`
  margin-top: 15px;
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  object-fit: cover;
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
`;