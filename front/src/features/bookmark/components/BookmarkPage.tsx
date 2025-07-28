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
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editFolder, setEditFolder] = useState<Folder | null>(null);



    return(
        <s.BookmarkPageContainer>
            <s.BookmarkPageSection>
                <s.FolderCreationBox onClick={() => setIsOpen(true)}>+</s.FolderCreationBox>


                {folders.map((folder, index) => (
                    <s.FolderCard key={index}>
                        <img src={colorToImageMap[folder.color]} alt={`${folder.name} 폴더`} />

                        <s.FolderCardHeader>
                            <p>{folder.name}</p>
                            <s.DropdownToggle onClick={() => setDropdownOpenIndex(dropdownOpenIndex === index ? null : index)}>
                                v {/*  이거 이미지로 바꿀까? */}
                            </s.DropdownToggle>

                            {dropdownOpenIndex === index && (
                                <s.DropdownMenu>
                                    <s.MenuItem
                                            onClick={() => {
                                                setEditIndex(index);
                                                setEditFolder(folder);
                                                setIsOpen(true);
                                                setDropdownOpenIndex(null);
                                            }}
                                        >
                                        폴더 수정
                                    </s.MenuItem>
                                    <s.StyledHr />
                                    <s.DeleteItem
                                            onClick={() => {
                                                setFolders(prev => prev.filter((_, i) => i !== index));
                                                setDropdownOpenIndex(null);
                                            }}
                                        >
                                        폴더 삭제
                                    </s.DeleteItem>
                                </s.DropdownMenu>
                            )}
                        </s.FolderCardHeader>
                    </s.FolderCard>
                ))}

                <FolderCreationModal 
                            isOpen={isOpen} 
                            onClose={() => { 
                                setIsOpen(false);
                                setEditIndex(null);
                                setEditFolder(null);
                            }}
                            mode={editIndex !== null ? "edit" : "create"}
                            initialFolderName={editFolder?.name}
                            initialColor={editFolder?.color}
                            onSubmit={(name, color) => {
                                    if (editIndex !== null) {
                                        setFolders(prev => {
                                            const updated = [...prev];
                                            updated[editIndex] = { name, color };
                                            return updated;
                                        });
                                    } else {
                                        setFolders(prev => [...prev, { name, color }]);
                                    }

                                    setIsOpen(false);
                                    setEditIndex(null);
                                    setEditFolder(null);  
                            }}
                        />



                <s.AddBookmark>북마크 추가 또는 폴더이동 모달창 시험</s.AddBookmark>

            </s.BookmarkPageSection>
        </s.BookmarkPageContainer>
    )
}


export default BookmarkPage;