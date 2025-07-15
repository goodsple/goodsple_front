import styled from "styled-components";

export const FooterContainer = styled.footer`
    background : #444444;
    width: 100%;
    padding: 40px 0;
    color: #ffffff;
`;

export const FooterInner = styled.div`
    max-width: 1800px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 16px;
    gap: 40px;
`;
export const FooterLeft = styled.div`
    flex: 0.5;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-right: 3px solid #D9D9D9;
    height: 210px;

    span {
    font-size: 14px;
    line-height: 1.4;
    }
    span:first-of-type {
        margin-top: 10px;
    }
`;

export const FooterRight = styled.div`
    flex : 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const FooterLogo = styled.img`
    width: 180px;
    object-fit: contain;
    margin-top: 20px;
`;

export const SectionTitle = styled.strong`
    font-weight: bold;
    font-size: 16px;
    color: #997BEB;
`;
 
export const ContactList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    margin-left: -40px;
    margin-top: 0px;

    li {
        width: calc(33% - 8px);
        font-size: 15px;
        color: #fff;
        font-weight:500;

        span {
            margin-left: 8px;
            color: #fff;
            font-size: 13px;
        }
    }
`;

export const ToolBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

export const ToolList = styled.ul`
    display: flex;
    gap: 12px;
    margin-left: -40px;
    margin-top: 0;


    li img {
        filter: invert(100%);
    }
`;

export const ToolDescription = styled.span`
    font-size: 12px;
    color: #fff;
    line-height: 1.5;
    flex: 1;
    margin-left:20px;
    margin-top: -25px;
`;