// 북마크를 어느 폴더에 추가/이동할것인지? 모달창
import type React from 'react';
import * as s from './BookmarkFolderSelectorStyle';

interface Folder {
    name: string;
}

interface BookmarkFolderSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    folders: Folder[];
    onSelect: (folderName: string) => void;
}

const BookmarkFolderSelector: React.FC<BookmarkFolderSelectorProps> = ({
        isOpen,
        onClose,
        folders,
        onSelect,
    }) => {

        if (!isOpen) return null;

        return(
            <s.Overlay onClick={onClose}>
                <s.ModalBox onClick={(e) => e.stopPropagation()}>
                    <s.Title>어떤 폴더에 추가하시겠습니까?</s.Title>
                    <s.FolderList>
                        {folders.map((folder, idx) => (
                            <s.FolderItem key={idx} onClick={() => onSelect(folder.name)}>
                                {folder.name}
                            </s.FolderItem>
                        ))}
                    </s.FolderList>
                    {/* 임시버튼 => 닫기 버튼이 아니라 새폴더 추가버튼을 넣어야됨!!! */}
                    <s.CloseButton onClick={onClose}>닫기</s.CloseButton>
                </s.ModalBox>
            </s.Overlay>
        )
}


export default BookmarkFolderSelector;