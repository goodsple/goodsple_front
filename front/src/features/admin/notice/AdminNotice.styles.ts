import styled from 'styled-components';

export const FormContainer = styled.form`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  width: 150px;
  font-weight: bold;
  margin-right: 16px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #9A9A9A;
  border-radius: 10px;
`;

export const Textarea = styled.textarea`
  flex: 1;
  height: 120px;
  padding: 10px;
  font-size: 16px;
  resize: vertical;
  border: 1px solid #9A9A9A;
  border-radius: 10px;
`;

export const FileInput = styled.input`
  font-size: 16px;
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
`;

export const CharCount = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
  margin-left: 20px;
`;

export const Divider = styled.hr`
  margin: 40px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

export const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const SubmitButton = styled.button`
  background-color: #997BEB;
  color: white;
  font-size: 18px;
  padding: 12px 40px;
  border: none;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #7e63d6;
  }
`;
