import styled from 'styled-components';

export const FilterWrapper = styled.div`
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 35px;
`;

export const FilterItem = styled.div`
        line-height: 30px;
        display: flex;
        gap: 15px;

        label {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            white-space: nowrap;
        }

        select {
            padding: 6px 8px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        span {
            font-size: 16px;
            margin: 0 5px;
    }
`;

export const DateInput = styled.input`
        padding: 6px 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
`;
