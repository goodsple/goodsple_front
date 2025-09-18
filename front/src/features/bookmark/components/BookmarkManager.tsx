import React, { useState } from 'react';
import BookmarkFolderSelector from './BookmarkFolderSelector';
import FolderCreationModal from './FolderCreationModal';

interface Folder {
    folderId: number;     
    folderName: string;    
    folderColor: string;   
}

let folderIdCounter = 1; 

const BookmarkManager: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>([
        { folderId: folderIdCounter++, folderName: '기본폴더', folderColor: '#FF4B4B' },
    ]);

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

    // 북마크 선택
    const handleSelectFolder = (folderId: number, mode: 'add' | 'move') => {
        const folder = folders.find(f => f.folderId === folderId);
        if (!folder) return;
        console.log(`북마크가 '${folder.folderName}' 폴더에 저장되었습니다.`);
        setIsSelectorOpen(false);
    };

    // 새 폴더 생성 후 자동 선택
    const handleAddFolder = (name: string, color: string) => {
        const newFolder: Folder = { folderId: folderIdCounter++, folderName: name, folderColor: color };
        setFolders([...folders, newFolder]);
        setIsFolderModalOpen(false);

        handleSelectFolder(newFolder.folderId, 'add'); 
    };

    return (
        <div>
            <button onClick={() => setIsSelectorOpen(true)}>북마크 폴더 선택</button>

            <BookmarkFolderSelector
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                folders={folders}
                mode="add"
                onSelect={handleSelectFolder}
                onAddFolder={() => {
                    console.log('새 폴더 모달 열기');   
                    setIsSelectorOpen(false);           
                    setIsFolderModalOpen(true);         
                }}
            />

            <FolderCreationModal
                isOpen={isFolderModalOpen}
                onClose={() => setIsFolderModalOpen(false)}
                folders={folders.map(f => ({ name: f.folderName, color: f.folderColor }))}
                mode="create"
                onSubmit={handleAddFolder}
            />
        </div>
    );
};

export default BookmarkManager;
