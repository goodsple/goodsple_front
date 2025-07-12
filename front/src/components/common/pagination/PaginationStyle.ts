import styled from "styled-components";

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;
`;
export const PageButton = styled.button<{active?:boolean}>`
    width: 40px;
    height: 40px;
    font-size: 16px;
    border: ${({ active }) => (active ? '1px solid #D9D9D9' : 'none')};
    background: ${({ active }) => (active ? '#fff' : 'transparent')};
    color: #444444;
    font-weight: ${({ active }) => (active ? '700' : '500')};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    img {
    width: 16px;
    height: 16px;
    filter: grayscale(100%) brightness(0.5);
    }
`;