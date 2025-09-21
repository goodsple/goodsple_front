import styled from "styled-components";

export const BookmarkFolderPageContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    color: #444444;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    width: 74vw;
    padding-top: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
`;

export const EditNotice = styled.div`
    width: 270px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #997bebd9;
    color: white;
    padding: 10px 22px;
    border-radius: 10px;
    font-size: 16px;
    text-align: center;
    z-index: 10;
`;


export const Button = styled.button`
    margin-left: 13px;
    padding: 7px 20px;
    border: 1px solid #997BEB;
    border-radius: 10px;
    background-color: #fff;
    color: #444;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #997beb8f;
        color: #fff;
    }
`;

export const DeleteButton = styled.button`
    margin-left: 13px;
    padding: 7px 20px;
    border: 1px solid #997BEB;
    border-radius: 10px;
    font-size: 16px;
    background-color: #fff;
    border-color: #ff4b4b;
    color: #ff4b4b;

    &:hover {
        background-color: #ff4b4bab;
        color: #fff;
    }
`;


export const BookmarkCard = styled.li<{ $selected: boolean }>`
    width: 200px;
    height: 260px;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid ${({ $selected }) => ($selected ? '#997BEB' : '#ddd')};
    position: relative;
    background-color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 20px;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }
`;

export const BookmarkList = styled.ul`
    width: 74vw;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
`;

export const BookmarkImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

export const BookmarkTitle = styled.div`
    padding: 5px 7px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const BookmarkMeta = styled.div`
    padding-left: 7px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #888;
`;

export const CheckOverlay = styled.div<{ $visible: boolean }>`
    display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(108,92,231,0.4);
    justify-content: center;
    align-items: center;
    font-size: 100px;
    color: white;
`;
