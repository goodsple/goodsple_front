import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { colorToImageMap } from '../utils/folderImageMap';
import BookmarkFolderSelector from './BookmarkFolderSelector';
import * as s from './BookmarkPageStyle';
import FolderCreationModal from './FolderCreationModal';


interface Folder {
    folderId? : number;
    name: string;
    color: string;
}

const BookmarkPage:React.FC = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editFolder, setEditFolder] = useState<Folder | null>(null);

    useEffect(() => {
        // 로그인 여부 체크
        const token = localStorage.getItem('accessToken');
        if(!token) {
            alert('로그인 후 이용 가능합니다.');
            navigate('/login');
            return;
        }
    }, [navigate]);
    

    useEffect(() => {
        // 초기 폴더 데이터 로딩
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await axiosInstance.get('/bookmark-folders', {
                    headers: { Authorization: `Bearer ${token}` } 
                });
                const mapped = res.data.map((f: any) => ({
                    folderId: f.folderId,
                    name: f.folderName,
                    color: f.folderColor
                }));
                setFolders(mapped);
            } catch (err) {
                console.error(err);
                // alert('폴더 로딩 실패');
            }
        };
        fetchFolders();
    }, []);

    // 폴더 생성
    const handleCreateFolder = async (name: string, color: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await axiosInstance.post(
                '/bookmark-folders',
                { folderName: name, folderColor: color },
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            // 새 폴더 반환값에 folderId가 포함되어 있다면 바로 추가
            const newFolder = { folderId: res.data.folderId, name, color };
            setFolders(prev => [...prev, newFolder]);
        } catch (err) {
            console.error(err);
            alert('폴더 생성 실패');
        }
    };

    // 폴더 수정
    const handleEditFolder = async (folderId: number, name: string, color: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axiosInstance.put(
                `/bookmark-folders/${folderId}`,
                { folderName: name, folderColor: color },
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            setFolders(prev => {
                const updated = [...prev];
                const index = updated.findIndex(f => f.folderId === folderId);
                if (index !== -1) updated[index] = { folderId, name, color };
                return updated;
            });
        } catch (err) {
            console.error(err);
            alert('폴더 수정 실패');
        }
    };

    // 폴더 삭제
    const handleDeleteFolder = async (folderId: number) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axiosInstance.delete(`/bookmark-folders/${folderId}`, {
                headers: { Authorization: `Bearer ${token}` } 
            });
            setFolders(prev => prev.filter(f => f.folderId !== folderId));
        } catch (err) {
            console.error(err);
            alert('폴더 삭제 실패');
        }
    };

   return (
        <s.BookmarkPageContainer>
            <s.BookmarkPageSection>
                <s.FolderCreationBox onClick={() => setIsOpen(true)}>+</s.FolderCreationBox>

                {folders.map((folder, index) => (
                    <s.FolderCard 
                            key={folder.folderId ?? index}
                            onClick={() => folder.folderId && navigate(`/bookmarkPage/folder/${folder.folderId}`)}
                        >
                        <img src={colorToImageMap[folder.color]} alt={`${folder.name} 폴더`} />

                        <s.FolderCardHeader>
                            <p>{folder.name}</p>
                            <s.DropdownToggle onClick={() => setDropdownOpenIndex(dropdownOpenIndex === index ? null : index)}>
                                v
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
                                            if(folder.folderId) handleDeleteFolder(folder.folderId); 
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
                    initialColor={editFolder?.color || '#FF4B4B'} // 기본값 설정
                    folders={folders}
                    onSubmit={(name, color) => {
                        if (editIndex !== null && editFolder?.folderId) {
                            handleEditFolder(editFolder.folderId, name, color);
                        } else {
                            handleCreateFolder(name, color);
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
                    onAddFolder={() => {   
                        console.log('새 폴더 모달 열기');
                        setIsSelectorOpen(false); // 선택 모달 닫기
                        setIsOpen(true);          // 폴더 생성 모달 열기
                    }}
                />

            </s.BookmarkPageSection>
        </s.BookmarkPageContainer>
    );
};


export default BookmarkPage;