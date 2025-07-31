import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 30px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-sizing: border-box;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
`;

export const HelpText = styled.p`
  font-size: 13px;
  color: #888;
  margin: 8px 0 0 0;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
`;

export const SubmitButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #997BEB;
  color: #fff;
`;

export const CancelButton = styled.button`
  padding: 12px 25px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #f0f0f0;
  color: #444;
`;