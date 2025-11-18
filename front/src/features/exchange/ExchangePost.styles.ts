// ExchangePostForm.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-top: 100px;
  margin-bottom: 30px;
`;

export const Divider = styled.hr`

  border: none;
  border-top: 1px solid #9A9A9A;
  margin: 16px 0;
`;

// export const Section = styled.div`
//   margin-bottom: 30px;
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

export const SectionRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  & > label {
    width: 140px;
    flex-shrink: 0;
  }

  & > input,
  & > textarea,
  & > div,
  & > select {
    flex-grow: 1;
  }
`;

export const Label = styled.label`
  width: 140px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  flex-grow: 1;
`;

export const Select = styled.select`
  width: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* 글자수와 입력창 간격 */
  width: 100%;

  & > span {
    margin-right: 14px;
    }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #444;
  margin-bottom: 15px;

  &::placeholder {
    color: #9A9A9A;
  }
`;

export const CharCount = styled.span`
  font-size: 14px;
  color: #888;
  white-space: nowrap;
`;

export const AmountInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 200px; 

  input {
    width: 150px;
  }

  span {
    font-size: 16px;
    color: #444;
  }
`;

export const AmountInput = styled.input`
  width: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #444;

  &::placeholder {
    color: #9A9A9A;
  }

  // 금액 입력 시 스크롤 방지
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const AutoFilledInput = styled(Input)`
  background-color: #F5F5F5;
`;

export const TextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 8px; /* 글자수와 입력창 간격 */
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #444;
  resize: none;

  &::placeholder {
    color: #9A9A9A;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: nowrap;
`;


export const Button = styled.button`
width: 100px;
  padding: 8px 16px;
  border: 1px solid #9A9A9A;
  border-radius: 10px;
  background-color: transparent;
  color: #444;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

export const ToggleButton = styled(Button) <{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#B1FF90' : '#fff')};
  border: 1px solid ${({ selected }) => (selected ? '#B1FF90' : '#B1FF90')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
    color: ${({ selected }) => (selected ? '#444' : '#9A9A9A')};
  border-radius: 10px;
`;

export const LocationSectionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 10px;

  & > label {
    width: 140px;
    flex-shrink: 0;
  }
`;

export const LocationInputWrapper = styled.div`
  margin-left: 160px;
  margin-top: 10px;
`;

export const DirectTradeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DirectTradeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ParcelTradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SubLabel = styled.div`
  width: 300px;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 24px;
`;

export const Box = styled.div`
  width: 100%;
  max-width: fit-content;
  border: 1px solid #9A9A9A;
  padding: 16px;
`;

export const ParcelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;

    & > span {
    width: 200px; // 텍스트 칸 고정
    white-space: nowrap; // 줄바꿈 방지
    flex-shrink: 0;
  }

  input[type='number'] {
    width: 150px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  font-size: 16px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const ConditionalOptions = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 220px;
  margin-top: 10px;
`;

export const ImagePreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
  align-items: center;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 16px;
  line-height: ;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background-color: #997BEB;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  padding: 15px 100px; // 적당히 크게
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  display: block;
  margin: 50px auto 80px; // 중앙 정렬
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8757d8;
  }
`;


// export const DeleteButton = styled.button`
//   position: absolute;
//   top: 4px;
//   right: 4px;
//   background: transparent;
//   border: none;
//   padding: 0;
//   cursor: pointer;

//   img {
//     width: 18px;
//     height: 18px;
//     display: block;
//   }
// `;


export const ImageUploadBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #d9d9d9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

export const UploadLabel = styled.label`
  width: 100px;
  height: 100px;
  border: 1px solid #9A9A9A;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 24px;
  color: #997beb;
  flex-direction: column;

  span {
    margin-top: 4px;
    font-size: 12px;
    color: #997beb;
  }
`;
