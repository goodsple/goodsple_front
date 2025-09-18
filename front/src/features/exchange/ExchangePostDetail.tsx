import axios from 'axios';
import JwtDecode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import bookmarkCheckIcon from '../../assets/images/bookmarkCheckIcon.png';
import bookmarkIcon from '../../assets/images/bookmarkIcon.png';
import chatIcon from '../../assets/images/chatIcon.png';
import clockIcon from '../../assets/images/clock.png';
import defaultProfile from '../../assets/images/default_profile.png';
import dropdownArrow from '../../assets/images/dropdownArrow.png';
import locationIcon from '../../assets/images/placeholder.png';
import deliveryIcon from '../../assets/images/shipping-fee.png';
import BookmarkFolderSelector from '../bookmark/components/BookmarkFolderSelector';
import FolderCreationModal from '../bookmark/components/FolderCreationModal';
import * as S from './ExchangePostDetail.styles';

interface JwtPayload {
    userId: number;
}

interface Post {
    postId: number;
    title: string;
    category: string;
    description: string;
    status: string;
    // writerId: number;
    location: string;
    tradeType: 'DIRECT' | 'DELIVERY' | 'BOTH';
    delivery: {
        normal: number;
        half: number;
        halfDeliveryType: string; // 'GS', 'CU', 'BOTH' 등 DB에서 받아오는 값
    };
    images: string[];
    createdAt: string;
    updatedAt: string;

    writer: { // 💡 추가된 필드
        id: number;
        profileImageUrl: string | null;
        nickname: string;
        level: number;
        badgeImageUrl: string | null;
    }

}

interface User {
    id: number;
    profileImageUrl: string | null;
    nickname: string;
    level: number;
    badgeImageUrl: string | null;
}

interface Folder {
    folderId : number;
    folderName: string;
    folderColor: string;
}


const ExchangePostDetail = () => {
    const { postId } = useParams<{ postId: string }>(); // postId는 string
    const postIdNum = Number(postId);

    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isWriter, setIsWriter] = useState<boolean>(false);

    const [showStatusOptions, setShowStatusOptions] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const accessToken = localStorage.getItem('accessToken'); // ✅ 토큰 불러오기
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    const [folders, setFolders] = useState<Folder[]>([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

    const [bookmarkCount, setBookmarkCount] = useState<number>(0);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    const navigate = useNavigate(); // 훅으로 navigate 함수 가져오기


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const postRes = await axios.get(`/api/posts/${postIdNum}`);
    //             setPost(postRes.data);

    //             const accessToken = localStorage.getItem('accessToken');
    //             if (accessToken) {
    //                 const userRes = await axios.get(`/api/users/me`, {
    //                     headers: { Authorization: `Bearer ${accessToken}` }
    //                 });
    //                 setUser(userRes.data);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchData();
    // }, [postIdNum]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const accessToken = localStorage.getItem('accessToken');
    //             let currentUser = null;
    //             if (accessToken) {
    //                 const userRes = await axios.get(`/api/users/me`, {
    //                     headers: { Authorization: `Bearer ${accessToken}` }
    //                 });
    //                 currentUser = userRes.data;
    //                 setUser(currentUser);
    //             }

    //             const postRes = await axios.get(`/api/posts/${postIdNum}`);
    //             setPost(postRes.data);

    //             // 💡 여기서 isWriter 상태를 업데이트
    //             if (currentUser && postRes.data) {
    //                 setIsWriter(currentUser.id === postRes.data.writer.id);
    //             }

    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchData();
    // }, [postIdNum]); // 의존성 배열에 postIdNum만 유지

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const accessToken = localStorage.getItem('accessToken');

    //             let currentUser = null;
    //             if (accessToken) {
    //                 const userRes = await axios.get(`/api/users/me`, {
    //                     headers: { Authorization: `Bearer ${accessToken}` }
    //                 });
    //                 console.log('userRes.data:', userRes.data); // 유저 정보 확인
    //                 currentUser = userRes.data;
    //                 setUser(currentUser);
    //             }

    //             const postRes = await axios.get(`/api/posts/${postIdNum}`);
    //             const postData = postRes.data;
    //             console.log('postData:', postData); // 게시글 정보 확인
    //             setPost(postData);

    //             if (currentUser) {
    //                 setIsWriter(String(currentUser.id) === String(postData.writer.id));
    //                 console.log('isWriter 계산:', String(currentUser.id) === String(postData.writer.id));
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchData();

    // }, [postIdNum]); // 의존성 배열에 postIdNum만 유지

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                let currentUserId: number | null = null;
                if (accessToken) {
                    // JWT에서 id 추출
                    const decoded = JwtDecode<any>(accessToken);
                    console.log('decoded token:', decoded);
                    currentUserId = Number(decoded.sub); // 여기서 sub 사용
                }

                const postRes = await axios.get(`/api/posts/${postIdNum}`);
                const postData = postRes.data;
                setPost(postData);

                if (currentUserId && postData.writer) {
                    setIsWriter(currentUserId === postData.writer.id);
                    console.log('isWriter 계산:', currentUserId === postData.writer.id);
                }

                // 북마크 정보
                if (accessToken) {
                    const res = await axiosInstance.get(`/bookmarks/${postIdNum}/bookmark-info`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    setBookmarkCount(res.data.bookmarkCount ?? 0);
                    setIsBookmarked(res.data.bookmarked ?? false);
                }

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [postIdNum]);

    // 북마크 코드 ----------------------------------------------

    // 폴더 불러오기
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return;
                const res = await axiosInstance.get("/bookmark-folders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const mapped: Folder[] = res.data.map((f: any) => ({
                    folderId: f.folderId,
                    folderName: f.folderName,
                    folderColor: f.folderColor,
                }));
                setFolders(mapped);
            } catch (err) {
                console.error("폴더 로딩 실패", err);
            }
        };
        fetchFolders();
    }, []);

    // 북마크 코드 ----------------------------------------------

    if (!post) {
        return <div>로딩중...</div>
    }

    // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    //     const scrollLeft = e.currentTarget.scrollLeft;
    //     const width = e.currentTarget.clientWidth;
    //     const index = Math.round(scrollLeft / width);
    //     setCurrentIndex(index);
    // };

    const toggleStatusOptions = () => setShowStatusOptions(prev => !prev);

    const handleStatusSelect = async (status: string) => {
        if (!post) return;
        try {
            await axios.put(`/api/posts/${postIdNum}/status`, { status }, { headers });
            setPost({ ...post, status });
            setShowStatusOptions(false);
        } catch (err) {
            console.error(err);
        }
    };

    const scrollToIndex = (index: number) => {
        if (sliderRef.current && post?.images) {
            const width = sliderRef.current.clientWidth;
            sliderRef.current.scrollTo({
                left: index * width,
                behavior: 'smooth',
            });
            setCurrentIndex(index);
        }
    };

    // "n분 전", "n시간 전" 등으로 변환
    const getTimeAgo = (isoString: string) => {
        const created = new Date(isoString); // new Date(ISOString)
        if (isNaN(created.getTime())) return "-"; // 안전 처리

        const diff = Math.floor((Date.now() - created.getTime()) / 1000);
        if (diff < 60) return `${diff}초 전`;
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
        if (diff < 31536000) return `${Math.floor(diff / 2592000)}달 전`;
        return `${Math.floor(diff / 31536000)}년 전`;
    };

    const statusMap: { [key: string]: string } = {
        AVAILABLE: "거래가능",
        IN_PROGRESS: "거래중",
        DONE: "거래완료"
    };

    // // 거래상태 드롭다운
    // const [showStatusOptions, setShowStatusOptions] = useState(false);
    // const [selectedStatus, setSelectedStatus] = useState("거래가능");

    // const toggleStatusOptions = () => {
    //     setShowStatusOptions((prev) => !prev);
    // };

    // const handleStatusSelect = (status: string) => {
    //     setSelectedStatus(status);
    //     setShowStatusOptions(false);
    //     // TODO: 서버 API 호출로 거래상태 업데이트 구현
    // };


    // 북마크 코드 ----------------------------------------------

    // 폴더 생성
    const handleCreateFolder = async (name: string, color: string) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("로그인이 필요합니다.");

            const res = await axiosInstance.post(
                "/bookmark-folders",
                { folderName: name, folderColor: color },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Folder 타입에 맞게 필드 이름 수정
            const newFolder: Folder = {
                folderId: res.data.folderId,
                folderName: name,
                folderColor: color,
            };

            setFolders((prev) => [...prev, newFolder]);
            setIsFolderModalOpen(false);
        } catch (err) {
            console.error("폴더 생성 실패", err);
        }
    };


    // 북마크 버튼 클릭 시
    // 폴더 선택 핸들러
    const handleSelectFolder = async (folderId: number, mode: "add" | "move") => {
        const folder = folders.find(f => f.folderId === folderId);
        if (!folder || !post) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            if (mode === "add") {
                await axiosInstance.post("/bookmarks", { postId: postIdNum, folderId: folder.folderId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert(`'${folder.folderName}' 폴더에 북마크로 저장되었습니다.`);
                setIsBookmarked(true);
            } else if (mode === "move") {
                const userBookmarksRes = await axiosInstance.get("/bookmarks", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const bookmarkToMove = userBookmarksRes.data.find((b: any) => b.postId === postIdNum);
                if (!bookmarkToMove) {
                    alert("이동할 북마크를 찾을 수 없습니다.");
                    return;
                }

                await axiosInstance.put(`/bookmarks/${bookmarkToMove.bookmarkId}/move`, { folderId: folder.folderId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert(`북마크가 '${folder.folderName}' 폴더로 이동되었습니다.`);
            }

            setIsSelectorOpen(false);

            // 북마크 상태 갱신
            const infoRes = await axiosInstance.get(`/bookmarks/${postIdNum}/bookmark-info`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookmarkCount(infoRes.data.bookmarkCount ?? 0);

        } catch (err: any) {
            console.error("폴더 선택 처리 실패:", err.response || err);
            alert(err.response?.data?.message || "처리에 실패했습니다.");
        }
    };


    const handleBookmarkToggle = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            if (isBookmarked) {
                // 1️현재 게시글(postId)에 해당하는 북마크Id 가져오기
                const userBookmarksRes = await axiosInstance.get("/bookmarks", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userBookmarks: { bookmarkId: number; postId: number; postType: string }[] = userBookmarksRes.data;

                // postId와 매칭되는 bookmark 찾기
                const bookmarkToDelete = userBookmarks.find(b => b.postId === postIdNum);
                if (!bookmarkToDelete) {
                    alert("삭제할 북마크를 찾을 수 없습니다.");
                    return;
                }

                // 북마크 삭제
                await axiosInstance.delete(`/bookmarks/${bookmarkToDelete.bookmarkId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // 삭제 후 상태 업데이트
                setIsBookmarked(false);

                // 최신 북마크 수 가져오기
                const infoRes = await axiosInstance.get(`/bookmarks/${postIdNum}/bookmark-info`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookmarkCount(infoRes.data.bookmarkCount ?? 0);

            } else {
                // 북마크 추가 (폴더 선택 모달 호출)
                setIsSelectorOpen(true);
            }
        } catch (err: any) {
            console.error("북마크 토글 실패:", err.response || err);
            alert(err.response?.data?.message || "북마크 처리에 실패했습니다.");
        }
    };


    // 북마크 코드 ----------------------------------------------

    return (
        <S.Container>
            <S.TopSection>
                {/* 왼쪽 이미지 슬라이더 */}
                <S.ImageSliderWrapper>
                    <S.ImageSlider ref={sliderRef}>
                        {post.images.map((src, idx) => (
                            <S.SlideImage key={idx} src={src} alt={`image-${idx}`} />
                        ))}
                    </S.ImageSlider>

                    <S.IndicatorWrapper>
                        {post.images.map((_, idx) => (
                            <S.IndicatorDot
                                key={idx}
                                onClick={() => scrollToIndex(idx)}
                                $active={currentIndex === idx} />
                        ))}
                    </S.IndicatorWrapper>
                </S.ImageSliderWrapper>

                {/* 오른쪽 정보 섹션 */}
                <S.RightInfoSection>
                    <S.TitleRow>
                        <S.Category>{post.category}</S.Category>
                        <S.Title>{post.title}</S.Title>
                        <S.StatusRow>
                            <S.StatusInfo>찜 {bookmarkCount}   조회수 0
                                <S.TimeWrapper>
                                    <S.StatusIcon src={clockIcon} alt="시계 아이콘" />
                                    {getTimeAgo(post.createdAt)}
                                </S.TimeWrapper>
                            </S.StatusInfo>
                            {!isWriter && <S.ReportButton>신고하기</S.ReportButton>}
                        </S.StatusRow>
                    </S.TitleRow>

                    {/* 태그 */}
                    <S.TagWrapper>
                        {post.tradeType === 'DIRECT' || post.tradeType === 'BOTH' ? <S.Tag>직거래</S.Tag> : null}
                        {post.tradeType === 'DELIVERY' || post.tradeType === 'BOTH' ? <S.Tag>택배거래</S.Tag> : null}

                        {isWriter && (
                            <S.StatusDropdownWrapper>
                                <S.StatusButton selected={post.status} onClick={toggleStatusOptions}>
                                    {statusMap[post.status] || post.status}
                                    <S.DropdownIcon src={dropdownArrow} alt="드롭다운 화살표" />
                                </S.StatusButton>
                                {showStatusOptions && (
                                    <S.StatusOptions>
                                        {["거래가능", "거래중", "거래완료"].map((status) => (
                                            <S.StatusOption
                                                key={status}
                                                selected={post.status === status}
                                                onClick={() => handleStatusSelect(status)}
                                            >
                                                {status}
                                            </S.StatusOption>
                                        ))}
                                    </S.StatusOptions>
                                )}
                            </S.StatusDropdownWrapper>
                        )}
                    </S.TagWrapper>

                    {/* 직거래 / 배송비 */}
                    <S.DetailBoxWrapper>
                        <S.DetailBox>
                            <S.BoxTitle>
                                <S.BoxIcon src={locationIcon} alt="직거래 희망지역 아이콘" />
                                직거래 희망지역
                            </S.BoxTitle>
                            <S.BoxContent>{post.location}</S.BoxContent>
                        </S.DetailBox>

                        <S.DetailBox>
                            <S.BoxTitle>
                                <S.BoxIcon src={deliveryIcon} alt="배송비 아이콘" />
                                배송비
                            </S.BoxTitle>

                            <S.BoxContent>
                                {post.delivery?.normal != null ? `일반 - ${post.delivery.normal.toLocaleString()}원` : '-'}
                            </S.BoxContent>

                            {post.delivery?.halfDeliveryType === '둘다 가능' && post.delivery.half != null && (
                                <S.BoxContent>
                                    GS반값 • CU알뜰 - {post.delivery.half.toLocaleString()}원
                                </S.BoxContent>
                            )}
                            {post.delivery?.halfDeliveryType === 'GS25' && post.delivery.half != null && (
                                <S.BoxContent>
                                    GS반값 - {post.delivery.half.toLocaleString()}원
                                </S.BoxContent>
                            )}
                            {post.delivery?.halfDeliveryType === 'CU' && post.delivery.half != null && (
                                <S.BoxContent>
                                    CU알뜰 - {post.delivery.half.toLocaleString()}원
                                </S.BoxContent>
                            )}
                        </S.DetailBox>
                    </S.DetailBoxWrapper>

                    {/* 버튼 */}
                    {isWriter ? (
                        <S.ManageButton
                            onClick={() => navigate('/exchange')}
                        >내 거래글 관리
                        </S.ManageButton>
                    ) : (
                        <S.ButtonGroup>
                            {/* <S.ActionButton onClick={() => setIsSelectorOpen(true)} style={{ cursor: "pointer" }}>
                                <img src={isBookmarked ? bookmarkCheckIcon : bookmarkIcon} alt="찜하기 아이콘" />
                                찜하기
                            </S.ActionButton> */}

                            <S.ActionButton onClick={handleBookmarkToggle} style={{ cursor: "pointer" }}>
                                <img src={isBookmarked ? bookmarkCheckIcon : bookmarkIcon} alt="찜하기 아이콘" />
                                찜하기
                            </S.ActionButton>


                            {/* 폴더 선택 모달 */}
                            <BookmarkFolderSelector
                                isOpen={isSelectorOpen}
                                onClose={() => setIsSelectorOpen(false)}
                                folders={folders}
                                mode={isBookmarked ? "move" : "add"}  
                                onSelect={handleSelectFolder}
                                onAddFolder={() => {
                                    setIsSelectorOpen(false);
                                    setIsFolderModalOpen(true);
                                }}
                            />


                            {/* 새 폴더 추가 모달 */}
                            <FolderCreationModal
                                isOpen={isFolderModalOpen}
                                onClose={() => setIsFolderModalOpen(false)}
                                mode="create"
                                folders={folders.map(f => ({ name: f.folderName, color: f.folderColor }))}
                                onSubmit={handleCreateFolder}
                            />

                            <S.ActionButton $main>
                                <img src={chatIcon} alt="채팅하기 아이콘" />
                                채팅하기
                            </S.ActionButton>
                            {/* <S.ActionButton>
                                <img src={lineIcon} alt="줄서기 아이콘" />
                                줄서기
                            </S.ActionButton> */}
                        </S.ButtonGroup>
                    )}

                </S.RightInfoSection>
            </S.TopSection>

            {/* <S.Divider /> */}

            <S.WriterSection>
                <S.WriterProfile>
                    <S.ProfileImage imageUrl={post.writer.profileImageUrl}>
                        <img
                            src={post.writer.profileImageUrl || defaultProfile}
                            alt="작성자 프로필"
                        />

                    </S.ProfileImage>
                    <div>
                        <S.WriterName>{post.writer.nickname || '익명'}</S.WriterName>
                        {/* <S.WriterLevel>{user.level}</S.WriterLevel> 가져올 레벨 db 없음 */}
                        <S.WriterLevel>
                            {/* Lv.{post.writer.level} */}
                            Lv.1 새싹 교환러
                            {post.writer.badgeImageUrl && (
                                <img src={post.writer.badgeImageUrl} alt="뱃지 이미지" />
                            )}
                        </S.WriterLevel>
                    </div>
                </S.WriterProfile>
            </S.WriterSection>
            <S.Divider />

            <S.Content>
                {post.description.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                ))}
            </S.Content>
            <S.Divider />
        </S.Container>
    );
};

export default ExchangePostDetail;
