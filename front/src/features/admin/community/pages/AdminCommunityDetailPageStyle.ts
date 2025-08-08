import styled from 'styled-components';

export const Container = styled.div`
        padding: 32px;
`;

export const Header = styled.div`
        display: flex;
        flex-wrap: wrap;
        gap: 130px;
        align-items: center;
        margin-bottom: 30px;
`;

export const Info = styled.div`
        font-size: 16px;

        b {
            font-weight: 750;
        }
`;

export const BackButton = styled.button`
        margin-left: auto;
        padding: 10px 20px;
        background-color: #ccc;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;

        &:hover {
            background: #8b8b8bff;
        }
`;

export const FilterBox = styled.div`
        line-height: 30px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 35px;

        label{
            font-size: 16px;
            font-weight: 600;
            margin-right: 15px;
            white-space: nowrap;
        }
`;

export const FilterItem = styled.div`
        display: flex;
`;

export const SearchInput = styled.input`
        width: 200px;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
`;

export const MessageBox = styled.div`
        height: 550px;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        gap: 16px;
        overflow-y: auto;
`;

export const MessageBubble = styled.div<{ isMine: boolean }>`
        align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
        background-color: ${({ isMine }) => (isMine ? '#c3a4f8' : '#888')};
        color: white;
        border-radius: 15px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        padding: 15px;
        max-width: 60%;
        position: relative;
`;

export const Time = styled.div`
        font-size: 13px;
        text-align: right;
        margin-top: 10px;
        opacity: 0.8;
`;
