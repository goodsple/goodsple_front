import React from "react";
import * as s from "./BookmarkFolderSelectorStyle";

interface Folder {
  folderId: number;
  folderName: string;
}

interface BookmarkFolderSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  folders: Folder[];
  mode: "add" | "move"; 
  onSelect: (folderId: number, mode: "add" | "move") => void; 
  onAddFolder: () => void; 
}

const BookmarkFolderSelector: React.FC<BookmarkFolderSelectorProps> = ({
  isOpen,
  onClose,
  folders,
  mode,
  onSelect,
  onAddFolder,
}) => {
  if (!isOpen) return null;

  return (
    <s.Overlay onClick={onClose}>
      <s.ModalBox onClick={(e) => e.stopPropagation()}>
        {/* 모드에 따라 안내 문구 다르게 */}
        <s.Title>
          {mode === "add"
            ? "어떤 폴더에 북마크를 추가하시겠습니까?"
            : "어떤 폴더로 북마크를 이동하시겠습니까?"}
        </s.Title>

        {/* 폴더 리스트 */}
        <s.FolderList>
          {folders.map((folder) => (
            <s.FolderItem
              key={folder.folderId}
              onClick={() => onSelect(folder.folderId, mode)} 
            >
              {folder.folderName}
            </s.FolderItem>
          ))}
        </s.FolderList>

        {/* 새 폴더 추가 버튼 */}
        <s.AddFolderButton
          onClick={(e) => {
            e.stopPropagation();
            onAddFolder();
          }}
        >
          + 새 폴더 추가
        </s.AddFolderButton>

        <s.CloseButton onClick={onClose}>닫기</s.CloseButton>
      </s.ModalBox>
    </s.Overlay>
  );
};

export default BookmarkFolderSelector;
