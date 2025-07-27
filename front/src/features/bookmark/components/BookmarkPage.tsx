import { useState } from 'react';
import * as s from './BookmarkPageStyle';
import FolderCreationModal from './FolderCreationModal';

const BookmarkPage:React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleCreateFolder = (name : string, color : string) => {
        console.log('폴더 생성 : ', name, color);
    }

    return(
        <s.BookmarkPageContainer>
            <s.BookmarkPageSection>
                 <s.FolderCreationBox onClick={() => setIsOpen(true)}>+</s.FolderCreationBox>
                 <FolderCreationModal 
                            isOpen={isOpen} 
                            onClose={() => setIsOpen(false)}
                            mode="create"
                            onSubmit={handleCreateFolder}    
                        />
            </s.BookmarkPageSection>
        </s.BookmarkPageContainer>
    )
}


export default BookmarkPage;