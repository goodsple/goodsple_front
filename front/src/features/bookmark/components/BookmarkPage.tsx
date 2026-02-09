import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { colorToImageMap } from '../utils/folderImageMap';
import BookmarkFolderSelector from './BookmarkFolderSelector';
import * as s from './BookmarkPageStyle';
import FolderCreationModal from './FolderCreationModal';

interface Folder {
    folderId: number;
    folderName: string;
    folderColor: string;
}

const BookmarkPage: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editFolder, setEditFolder] = useState<Folder | null>(null);

    // 로그인 체크
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인 후 이용 가능합니다.');
            navigate('/login');
        }
    }, [navigate]);

    // 폴더 리스트 불러오기
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await axiosInstance.get('/bookmark-folders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const mapped = res.data.map((f: any) => ({
                    folderId: f.folderId,
                    folderName: f.folderName,
                    folderColor: f.folderColor,
                }));
                setFolders(mapped);
            } catch (err) {
                console.error(err);
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
            const newFolder = { folderId: res.data.folderId, folderName: name, folderColor: color };
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
            setFolders(prev => prev.map(f => (f.folderId === folderId ? { folderId, folderName: name, folderColor: color } : f)));
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
                headers: { Authorization: `Bearer ${token}` },
            });
            setFolders(prev => prev.filter(f => f.folderId !== folderId));
        } catch (err) {
            console.error(err);
            alert('폴더 삭제 실패');
        }
    };

    // 폴더 선택 (북마크 추가/이동)
    const handleSelectFolder = (folderId: number, mode: 'add' | 'move') => {
        const folder = folders.find(f => f.folderId === folderId);
        if (!folder) return;
        alert(`'${folder.folderName}' 폴더에 북마크를 ${mode === 'add' ? '저장' : '이동'}합니다.`);
        setIsSelectorOpen(false);
    };

    return (
        <s.BookmarkPageContainer>
            <s.BookmarkPageSection>
                {/* 폴더 생성 버튼 */}
                <s.FolderCreationBox onClick={() => {
                    setEditIndex(null);
                    setEditFolder(null);
                    setIsOpen(true);
                }}>+</s.FolderCreationBox>

                {/* 폴더 카드 리스트 */}
                {folders.map((folder, index) => (
                    <s.FolderCard
                        key={folder.folderId ?? index}
                        onClick={() => navigate(`/bookmarkPage/folder/${folder.folderId}`)}
                    >
                        <img src={colorToImageMap[folder.folderColor]} alt={`${folder.folderName} 폴더`} />
                        <s.FolderCardHeader>
                            <p>{folder.folderName}</p>
                            {/* 드롭다운 토글 */}
                            <s.DropdownToggle
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
                                }}
                            >
                                v
                            </s.DropdownToggle>

                            {/* 드롭다운 메뉴 */}
                            {dropdownOpenIndex === index && (
                                <s.DropdownMenu>
                                    <s.MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteFolder(folder.folderId);
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

                {/* 폴더 생성/수정 모달 */}
                <FolderCreationModal
                    isOpen={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                        setEditIndex(null);
                        setEditFolder(null);
                    }}
                    mode={editIndex !== null ? 'edit' : 'create'}
                    initialFolderName={editFolder?.folderName}
                    initialColor={editFolder?.folderColor || '#FF4B4B'}
                    folders={folders.map(f => ({ name: f.folderName, color: f.folderColor }))}
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

                {/* 북마크 추가 버튼 => 게시글 구현 전 예시 버튼*/}
                {/* <s.AddBookmark onClick={() => setIsSelectorOpen(true)}>북마크 추가</s.AddBookmark> */}

                {/* 폴더 선택 모달 */}
                <BookmarkFolderSelector
                    isOpen={isSelectorOpen}
                    onClose={() => setIsSelectorOpen(false)}
                    folders={folders}
                    mode="add"
                    onSelect={handleSelectFolder}
                    onAddFolder={() => {
                        setIsSelectorOpen(false);
                        setEditIndex(null);
                        setEditFolder(null);
                        setIsOpen(true);
                    }}
                />
            </s.BookmarkPageSection>
        </s.BookmarkPageContainer>
    );
};

export default BookmarkPage;
