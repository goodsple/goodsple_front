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
    onAddFolder: () => void; // 새 폴더 추가 버튼
}

const BookmarkFolderSelector: React.FC<BookmarkFolderSelectorProps> = ({
        isOpen,
        onClose,
        folders,
        onSelect,
        onAddFolder = () => console.warn('onAddFolder prop이 없습니다!')
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

                    <s.AddFolderButton
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('AddFolder 버튼 클릭'); // 여기 찍히는지 확인
                            if (onAddFolder) {
                                onAddFolder();
                            } else {
                                console.error('onAddFolder prop이 없습니다!');
                            }
                    }}
                    >
                        + 새 폴더 추가
                    </s.AddFolderButton>

                    <s.CloseButton onClick={onClose}>닫기</s.CloseButton>
                </s.ModalBox>
            </s.Overlay>
        )
}


export default BookmarkFolderSelector;