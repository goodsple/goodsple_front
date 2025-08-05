import styled from 'styled-components';

export const FilterContainer = styled.div`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 5px;
`;

export const FilterWrapper = styled.div`
    
`;

export const FilterItem = styled.div`
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 32px;

        label {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            white-space: nowrap;
        }

        span {
            font-size: 16px;
            margin: 0 5px;
        }
`;

export const Input = styled.input`
        padding: 6px 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
`;

export const ButtonWrapper = styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-end; 
        gap: 12px;
`;

export const AddButton = styled.button`
        height: 40px;
        background-color: #a489ec;
        color: white;
        border: none;
        padding: 8px 22px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
`;

export const DeleteButton = styled.button`
        height: 40px;
        background-color: #333;
        color: white;
        border: none;
        padding: 8px 22px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
`;
