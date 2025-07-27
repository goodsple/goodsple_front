import { useState } from 'react';
import { colorToImageMap } from '../utils/folderImageMap';
import * as s from './BookmarkPageStyle';
import FolderCreationModal from './FolderCreationModal';


interface Folder {
    name: string;
    color: string;
}

const BookmarkPage:React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);

    const handleCreateFolder = (name : string, color : string) => {
        setFolders(prev => [...prev, {name, color }]);
        setIsOpen(false);
        console.log('폴더 생성 : ', name, color);
    }

    return(
        <s.BookmarkPageContainer>
            <s.BookmarkPageSection>
                <s.FolderCreationBox onClick={() => setIsOpen(true)}>+</s.FolderCreationBox>


                {folders.map((folder, index) => (
                    <s.FolderCard key={index}>
                        <img src={colorToImageMap[folder.color]} alt={`${folder.name} 폴더`} />
                        <p>{folder.name}</p>
                    </s.FolderCard>
                ))}

                <FolderCreationModal 
                            isOpen={isOpen} 
                            onClose={() => setIsOpen(false)}
                            mode="create"
                            onSubmit={handleCreateFolder}    
                        />



                <s.AddBookmark>북마크 추가 또는 폴더이동 모달창 시험</s.AddBookmark>

            </s.BookmarkPageSection>
        </s.BookmarkPageContainer>
    )
}


export default BookmarkPage;