import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 24px; 
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;  

  label {
    font-weight: 500;
    white-space: nowrap;
  }

  select,
  input[type="text"],
  input[type="date"] {
    padding: 8px 12px;
    border: 1px solid #9A9A9A;
    border-radius: 5px;
  }
  input[type="text"] {
    width: 208px;
  }

  span {
    margin: 0 4px;
  }
  input[type="checkbox"] {
    accent-color: #997BEB; 
  }
`;

export const Group2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;  

  label {
    font-weight: 500;
    white-space: nowrap;
  }

  select,
  input[type="text"],
  input[type="date"] {
    padding: 8px 12px;
    border: 1px solid #9A9A9A;
    border-radius: 5px;
  }
  input[type="text"] {
    width: 208px;
  }

  span {
    margin: 0 4px;
  }
`;

export const SearchWrap = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    
    select,
    input[type="text"],
    input[type="date"] {
        padding: 8px 12px;
        border: 1px solid #9A9A9A;
        border-radius: 5px;
    }
    input[type="text"] {
        width: 208px;
    }

    img {
        width: 18px;
        height: 18px;
        transform: translateX(-30px);
    }
    
    button {
        all: unset;
        cursor: pointer;
    }
`;

export const ButtonWrap = styled.div `
    display: flex;
    flex-direction: row;
    gap: 10px;
    
    button {
        all: unset;
        cursor: pointer;
        width: 170px;
        height: 40px;
        font-size: 20px;
        letter-spacing: -1px;
        text-align: center;
        color: white;
        background-color: #997BEB;
    }
  
`;

export const SearchButton = styled.button`
  padding: 6px 16px;
  background: #997BEB;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: RGBA(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
`;

export const Modal = styled.form`
    width: 500px;
    height: 350px;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: black;
    font-family: 'Pretendard', sans-serif;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    p {
        font-size: 24px;
        margin: 15px 0;
    }
`;

export const ModalRow = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    width: 450px;
    
    input {
        width: 340px;
        height: 30px;
        outline: none;
        border: none;
        background-color: #F5F5F5;
        color: black;
        border-radius: 5px;
        font-size: 16px;
    }
    
    input::placeholder {
        color: #D9D9D9;
    }
    
    p {
        font-size: 16px;
        font-weight: 600;
        width: 100px;
        margin: 10px 0;
    }
    
    select {
        background-color: #997BEB;
        color: white;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        width: 120px;
        height: 30px;
    }

    button {
        all: unset;
        cursor: pointer;
        width: 120px;
        height: 30px;
        font-size: 14px;
        text-align: center;
        color: white;
        background-color: #997BEB;
        border-radius: 5px;
    }
`;

export const ModalRow2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    button {
        all: unset;
        cursor: pointer;
        width: 140px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        color: white;
        background-color: #997BEB;
        border-radius: 10px;
        margin: 15px 0;
    }
`;

export const ResetButton = styled.button`
  margin-left: 8px;
  padding: 6px 16px;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
`;
