import React, { useState } from 'react';
import BookmarkFolderSelector from './BookmarkFolderSelector';
import FolderCreationModal from './FolderCreationModal';

interface Folder {
    name: string;
    color: string;
}


const BookmarkManager: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>([
        { name: '기본폴더', color: '#FF4B4B' },
    ]);

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

    // 북마크 선택
    const handleSelectFolder = (folderName: string) => {
        console.log(`북마크가 '${folderName}' 폴더에 저장되었습니다.`);
        setIsSelectorOpen(false);
    };

    // 새 폴더 생성 후 자동 선택
    const handleAddFolder = (name: string, color: string) => {
        const newFolder = { name, color };
        setFolders([...folders, newFolder]);
        setIsFolderModalOpen(false);

        handleSelectFolder(name); // 생성 후 자동 선택
    };

    return (
        <div>
            <button onClick={() => setIsSelectorOpen(true)}>북마크 폴더 선택</button>

            <BookmarkFolderSelector
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                folders={folders}
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
                folders={folders}
                mode="create"
                onSubmit={handleAddFolder}
            />
        </div>
    );
};

export default BookmarkManager;
