import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import defaultProfile from "../../../assets/images/ProfileImage.png";
import * as s from './BookmarkFolderPageStyle';
import BookmarkFolderSelector from "./BookmarkFolderSelector";

interface BookmarkResponse {
    bookmarkId: number;
    folderId: number;
    postId: number;
    postType: 'exchange' | 'event';
    bookmarkedAt: string;
}

interface Post {
    title: string;
    images: string[];
    writer: {
        nickname: string;
    };
}

interface BookmarkWithPost extends BookmarkResponse {
    post: Post;
}

interface Folder {
    folderId: number;
    folderName: string;
}

const BookmarkFolderPage: React.FC = () => {
    const { folderId } = useParams<{ folderId: string }>();
    const folderIdNum = folderId ? parseInt(folderId, 10) : null;
    const navigate = useNavigate();

    const [bookmarks, setBookmarks] = useState<BookmarkWithPost[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);

    // 북마크 가져오기
    useEffect(() => {
        if (!folderIdNum) return;

        const fetchBookmarks = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    alert('로그인 후 이용 가능합니다.');
                    navigate('/login');
                    return;
                }

                setLoading(true);

                const res = await axiosInstance.get(`/bookmarks/folders/${folderIdNum}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const bookmarkList: BookmarkResponse[] = res.data;

                const withPosts: BookmarkWithPost[] = await Promise.all(
                    bookmarkList.map(async (b) => {
                        const postRes = await axiosInstance.get(`/posts/${b.postId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        return { ...b, post: postRes.data };
                    })
                );

                setBookmarks(withPosts);
            } catch (err) {
                console.error(err);
                alert('북마크 로딩 실패');
            } finally {
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, [folderIdNum, navigate]);

    // 폴더 목록 불러오기
    const fetchFolders = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axiosInstance.get(`/bookmark-folders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFolders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setSelectedIds([]);
    };

    const toggleSelect = (bookmarkId: number) => {
        if (!editMode) return;
        setSelectedIds(prev =>
            prev.includes(bookmarkId)
                ? prev.filter(id => id !== bookmarkId)
                : [...prev, bookmarkId]
        );
    };

    // 선택된 폴더로 이동
    const handleMove = async (targetFolderId: number) => {
        if (selectedIds.length === 0) {
            alert("이동할 북마크를 선택해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("로그인 후 이용 가능합니다.");
                navigate("/login");
                return;
            }

            await axiosInstance.post('/bookmarks/move', {
                bookmarkIds: selectedIds,
                targetFolderId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`선택된 북마크를 이동했습니다.`);
            setSelectedIds([]);
            setIsSelectorOpen(false);

            // 이동 후 다시 북마크 불러오기
            const res = await axiosInstance.get(`/bookmarks/folders/${folderIdNum}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const bookmarkList: BookmarkResponse[] = res.data;
            const withPosts: BookmarkWithPost[] = await Promise.all(
                bookmarkList.map(async (b) => {
                    const postRes = await axiosInstance.get(`/posts/${b.postId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    return { ...b, post: postRes.data };
                })
            );
            setBookmarks(withPosts);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("삭제할 북마크를 선택해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("로그인 후 이용 가능합니다.");
                navigate("/login");
                return;
            }

            await Promise.all(selectedIds.map(id =>
                axiosInstance.delete(`/bookmarks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ));
            setBookmarks(prev => prev.filter(b => !selectedIds.includes(b.bookmarkId)));
            setSelectedIds([]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCardClick = (b: BookmarkWithPost) => {
        if (editMode) {
            toggleSelect(b.bookmarkId);
        } else {
            // 게시글 상세 페이지로 이동
            navigate(`/exchange/detail/${b.postId}`);
        }
    };


    if (!folderIdNum) return <div>폴더를 찾을 수 없습니다.</div>;

    return (
        <s.BookmarkFolderPageContainer>
            <s.Header>
                {editMode && <s.EditNotice>폴더 이동 / 삭제 할 게시글을 선택해주세요.</s.EditNotice>}
                {!editMode ? (
                    <>
                        <s.Button onClick={toggleEditMode}>편집</s.Button>
                        <s.Button onClick={() => navigate(-1)}>뒤로가기</s.Button>
                    </>
                ) : (
                    <>
                        <s.Button
                            onClick={() => {
                                fetchFolders();
                                setIsSelectorOpen(true);
                            }}
                        >
                            폴더 이동
                        </s.Button>
                        <s.DeleteButton onClick={handleDelete}>삭제</s.DeleteButton>
                        <s.Button onClick={toggleEditMode}>취소</s.Button>
                    </>
                )}
            </s.Header>

            {loading ? (
                <div>북마크 로딩 중...</div>
            ) : (
                <s.BookmarkList>
                    {bookmarks.map((b) => (
                        <s.BookmarkCard
                            key={b.bookmarkId}
                            $selected={selectedIds.includes(b.bookmarkId)}
                            onClick={() => handleCardClick(b)}
                        >
                            <s.BookmarkImage
                                src={b.post.images?.[0] || defaultProfile}
                                alt="게시글 이미지"
                            />
                            <s.BookmarkTitle>{b.post.title}</s.BookmarkTitle>
                            <s.BookmarkMeta>{b.post.writer?.nickname || "익명"}</s.BookmarkMeta>
                            <s.CheckOverlay $visible={selectedIds.includes(b.bookmarkId)}>✓</s.CheckOverlay>
                        </s.BookmarkCard>
                    ))}
                </s.BookmarkList>
            )}

            <BookmarkFolderSelector
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                folders={folders}
                mode="move" // ✅ BookmarkFolderSelector와 맞춤
                onSelect={(folderId) => handleMove(folderId)} // ✅ folderId만 받도록
                onAddFolder={() => alert("새 폴더 추가 기능 준비중")}
            />
        </s.BookmarkFolderPageContainer>
    );
};

export default BookmarkFolderPage;
