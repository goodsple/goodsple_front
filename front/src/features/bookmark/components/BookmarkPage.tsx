import { useState } from 'react';
import { colorToImageMap } from '../utils/folderImageMap';
import BookmarkFolderSelector from './BookmarkFolderSelector';
import * as s from './BookmarkPageStyle';
import FolderCreationModal from './FolderCreationModal';


interface Folder {
    name: string;
    color: string;
}

const BookmarkPage:React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([
        { name: '굿즈나라', color: '#997BEB' },
        { name: '교환', color: '#FFC72E' },
        { name: '게임나라', color: '#7D93CC' },
        { name: '거래', color: '#75E87B' },
        { name: '굿즈나라', color: '#997BEB' },
        { name: '교환', color: '#FFC72E' },
        { name: '게임나라', color: '#7D93CC' },
        { name: '거래', color: '#75E87B' }
    ]);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editFolder, setEditFolder] = useState<Folder | null>(null);

const colorOptions = ['#FF4B4B'
                    , '#F3A14A'
                    , '#FFC72E'
                    , '#75E87B'
                    , '#5BA86F'
                    , '#7D93CC'
                    , '#997BEB'
                    , '#FA7DDF']

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


                <s.AddBookmark onClick={() => setIsSelectorOpen(true)}>
                    북마크 추가
                </s.AddBookmark>

                <BookmarkFolderSelector
                        isOpen={isSelectorOpen}
                        onClose={() => setIsSelectorOpen(false)}
                        folders={folders}
                        onSelect={(folderName) => {
                            alert(`'${folderName}' 폴더에 북마크를 저장합니다.`);
                            setIsSelectorOpen(false);
                        }}
                />

            </s.BookmarkPageSection>
        </s.BookmarkPageContainer>
    )
}


export default BookmarkPage;