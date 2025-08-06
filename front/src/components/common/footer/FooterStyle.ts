import styled from "styled-components";

export const FooterContainer = styled.footer`
    background : #444444;
    width: 100%;
    padding: 5px 0;
    color: #ffffff;
`;

export const FooterInner = styled.div`
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;         
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 70px;
`;
export const FooterLeft = styled.div`
    flex: 0.6;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-right: 3px solid #D9D9D9;
    height: 130px;
    margin-top: 14px;

    span {
    font-size: 12px;
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
    gap: 12px;
    margin-top: 14px;
`;

export const FooterLogo = styled.img`
    width: 130px;
    object-fit: contain;
    margin-top: 8px;
`;

export const SectionTitle = styled.strong`
    font-weight: bold;
    font-size: 13px;
    color: #997BEB;

    &.conTitle {
        // margin-top:10px;
    }
    &.fooTitle {
        margin-top : -8px;
    }
`;
 
export const ContactList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    margin-left: -40px;
    margin-top: 0px;

    li {
        // width: calc(33% - 8px);
        width: calc(20% - 12px);
        font-size: 12px;
        color: #fff;
        font-weight:500;

        span {
            margin-left: 8px;
            color: #fff;
            font-size: 12px;
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
        width: 26px;
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