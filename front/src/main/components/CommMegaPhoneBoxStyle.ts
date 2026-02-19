import styled from "styled-components";

/* CommMegaPhoneBox.tsx */
export const megaPhoneWrap = styled.div`
        width: 1050px;
        height: 50px;
        background-color: #444444;
        color: white;
        display: flex;
        flex-direction: row;
        border-radius: 30px;
        box-shadow: 2px 2px 0 0 #997BEB;
        padding: 0 50px;
        align-items: center;
        gap: 20px;
        font-family: 'Pretendard', sans-serif;
        font-size: 16px;
        font-weight: 200;
        // letter-spacing: 0.5px;

        img{
            width: 35px;
            height: 35px;
        }
`; 
    
export const megaButton = styled.button`
        all: unset;
        outline: none;
        height: 33px;
        width: 100px;
        margin-left: auto;
        background-color: #997BEB;
        color: white;
        border-radius: 10px;
        font-family: 'Pretendard', sans-serif;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        text-align: center;

        &:hover {
            background-color: #745db1;
        }


`; 
