import styled from 'styled-components';

export const CommTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    margin-top: 20px;
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

    button {
        padding: 5px 13px;
        font-size: 16px;
        background-color: #fff;
        color: #444;
        border: 1px solid #444;
        border-radius: 15px;
        cursor: pointer;
    }

    button:hover {
        background-color: #bdbdbdff;
    }
`;
