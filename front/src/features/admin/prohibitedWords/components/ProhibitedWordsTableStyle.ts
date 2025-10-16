import styled from 'styled-components';

export const Table = styled.table`
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
        font-size: 16px;

        th, td {
            border-bottom: 1px solid #ddd;
            text-align: center;
        }

        th {
            background-color: #EBEBEB;
            font-weight: bold;
        }

        th.hidden-header {
            display: none;
        }

        thead {
            height: 60px;
        }

        tbody tr:hover {
            background: #997BEB;
            color: #fff;
        }

        td {
            line-height: 53px;
        }
`;


export const Status = styled.span<{ active: boolean }>`
        background-color: ${({ active }) => (active ? '#A489EC' : '#CCC')};
        color: white;
        padding: 7px 12px;
        border-radius: 8px;
        font-size: 14px;

        &.active {
            color: green;
        }
        &.inactive {
            color: gray;
        }
`;
