import styled from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 40px;
`;

export const Title = styled.h2`
  font-size: 22px;
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
`;

export const Label = styled.label`
  flex-basis: 120px;
  font-weight: 500;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
`;

export const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
  resize: vertical;
`;

export const SearchAddressButton = styled.button`
  padding: 10px 15px;
  border: 1px solid #444444;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
`;