import styled from "styled-components";

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
  /* transform: translateX(-10%); */
`;

export const CateButton = styled.button`
  all: unset;
  outline: none;
  height: 45px;
  min-width: 105px;
  border: 1px solid #997BEB;
  border-radius: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  letter-spacing: -1px;
  cursor: pointer;
  text-align: center;
  color: #444444;

  &:hover {
    border: 1px solid #997BEB;
    background-color: #997BEB;
    color: white;
    font-size: 20px;
    letter-spacing: -1px;
  }
`;
