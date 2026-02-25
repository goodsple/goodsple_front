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
import { default as defaultBadge, default as lv1Badge } from '../../assets/images/LV1.png';
import lv2Badge from '../../assets/images/LV2.png';
import lv3Badge from '../../assets/images/LV3.png';
import lv4Badge from '../../assets/images/LV4.png';
import lv5Badge from '../../assets/images/LV5.png';
import locationIcon from '../../assets/images/placeholder.png';
import deliveryIcon from '../../assets/images/shipping-fee.png';
import BookmarkFolderSelector from '../bookmark/components/BookmarkFolderSelector';
import FolderCreationModal from '../bookmark/components/FolderCreationModal';
import { useReport } from '../report/ReportContext';
import * as S from './ExchangePostDetail.styles';

// 채팅 api
import { startRoom } from '../exchangeChat/api/ExchangeChatApi';

interface JwtPayload {
    userId: number;
}

// 게시글 인터페이스
interface Post {
    postId: number;
    title: string;
    category: string;
    viewCount: number;
    description: string;
    status: 'AVAILABLE' | 'ONGOING' | 'COMPLETED';
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
        
        badgeLevel: number;
        badgeName: string;
        badgeImageUrl: string | null;
    }

}

interface ReviewItem {
    reviewId: number;
    writerId: number;
    writerNickname: string;
    writerProfileImage: string | null;
    rating: number;
    content: string;
    createdAt: string;
    images: string[];
}

// 사용자 인터페이스
interface User {
    id: number;
    profileImageUrl: string | null;
    nickname: string;
    level: number;
    badgeImageUrl: string | null;
}

// 폴더 인터페이스
interface Folder {
    folderId: number;
    folderName: string;
    folderColor: string;
}

const badgeImageMap: Record<string, string> = {
    "/images/LV1.png": lv1Badge,
    "/images/LV2.png": lv2Badge,
    "/images/LV3.png": lv3Badge,
    "/images/LV4.png": lv4Badge,
    "/images/LV5.png": lv5Badge,
};

// 교환게시글 상세 컴포넌트
const ExchangePostDetail = () => {
    const { postId } = useParams<{ postId: string }>(); // postId는 string
    const postIdNum = Number(postId);

    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isWriter, setIsWriter] = useState<boolean>(false);
    const [reviews, setReviews] = useState<ReviewItem[]>([]);

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

    const [shouldReopenSelector, setShouldReopenSelector] = useState(false);

    const navigate = useNavigate(); // 훅으로 navigate 함수 가져오기

    const { openReport } = useReport();

    const handleOpenReport = () => {
        if (!post) return;
        openReport({
            targetType: 'POST',
            targetId: post.postId,
            reportTargetUserId: post.writer?.id ?? null,
        });
    };

    // 게시글 데이터 불러오기
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

                // 게시글 상세 정보 API 호출
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

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axiosInstance.get(`/reviews/by-post/${postIdNum}`);
                setReviews(res.data ?? []);
            } catch (err) {
                console.error('후기 조회 실패', err);
            }
        };
        if (!Number.isNaN(postIdNum)) {
            fetchReviews();
        }
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

    const handleStatusSelect = (status: string) => {
        if (!post) return;

        // 서버 호출 제거하고, 프론트에서만 상태 변경
        setPost({ ...post, status });
        setShowStatusOptions(false);
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
        ONGOING: "거래중",
        COMPLETED: "거래완료"
    };

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

            setFolders((prev) => [...prev, newFolder]); // 폴더 추가
            setIsFolderModalOpen(false); // 생성 모달 먼저 닫기

            if (shouldReopenSelector) {
                setIsSelectorOpen(true);      // 다시 폴더 선택 모달 열기
                setShouldReopenSelector(false);
            }

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
                // 현재 게시글(postId)에 해당하는 북마크Id 가져오기
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

    // 채팅하기 핸들러
    const handleStartChat = async () => {
        if (!post) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login", { replace: true });
            return;
        }

        // tradeType → '직거래' | '택배' 로만 매핑
        const decideMethod = (tradeType: Post["tradeType"]): '직거래' | '택배' => {
            if (tradeType === 'DELIVERY') return '택배';
            if (tradeType === 'DIRECT') return '직거래';
            // BOTH 일 때 기본 정책: 직거래 우선(지역 있으면 직거래, 없으면 택배)
            return post.location && post.location.trim() ? '직거래' : '택배';
        };

        try {

            // 방 생성/재사용
            const { roomId, room, isNew } = await startRoom(post.writer.id, post.postId);

            // 채팅 화면 이동 + 우측 인트로 카드용 데이터 전달
            navigate(`/exchange-chat/${roomId}`, {
                state: {
                    isNewRoom: isNew,
                    isWriter: false, // 상세에서 구매자 진입이므로 기본 false (상황에 맞게 조절)
                    peer: {
                        userId: post.writer.id,
                        nickname: post.writer.nickname,
                        avatar: post.writer.profileImageUrl ?? undefined,
                        // levelText: `Lv.${post.writer.level ?? 1} 교환러`,
                    },
                    postPreview: {
                        title: post.title,
                        thumb: post.images?.[0],
                        method: decideMethod(post.tradeType), // ★ 직거래 | 택배
                        regionText: post.location || '',      // ★ 직거래 희망지역
                        // 필요하면 태그 유지
                        tags: [post.category].filter(Boolean),
                    },
                },
            });

        } catch (e) {
            console.error("채팅방 생성 실패:", e);
            alert("채팅방을 만들 수 없어요. 잠시 후 다시 시도해주세요.");
        }
    };

    console.log(post.writer);

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
                            <S.StatusInfo>찜 {bookmarkCount}   조회수 {post.viewCount}
                                <S.TimeWrapper>
                                    <S.StatusIcon src={clockIcon} alt="시계 아이콘" />
                                    {getTimeAgo(post.createdAt)}
                                </S.TimeWrapper>
                            </S.StatusInfo>
                            {!isWriter && <S.ReportButton onClick={handleOpenReport}>신고하기</S.ReportButton>}
                        </S.StatusRow>
                    </S.TitleRow>

                    {/* 태그 */}
                    <S.TagWrapper>
                        {post.tradeType === 'DIRECT' || post.tradeType === 'BOTH' ? <S.Tag>직거래</S.Tag> : null}
                        {post.tradeType === 'DELIVERY' || post.tradeType === 'BOTH' ? <S.Tag>택배거래</S.Tag> : null}

                        {/* 거래 상태 표시 */}
                        <S.TradeStatus status={post.status}>
                            {statusMap[post.status]}
                        </S.TradeStatus>
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
                                    setShouldReopenSelector(true);
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

                            <S.ActionButton $main onClick={handleStartChat}>
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
                            LV{post.writer.badgeLevel}. {post.writer.badgeName}

                            <img
                                src={
                                        post.writer.badgeImageUrl
                                            ? badgeImageMap[post.writer.badgeImageUrl]
                                            : defaultBadge
                                    }
                                alt="뱃지"
                                width="40px"
                                height="40px"
                            />
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

            <S.ReviewSection>
                <S.ReviewTitle>
                    후기 <S.ReviewCount>({reviews.length})</S.ReviewCount>
                </S.ReviewTitle>
                {reviews.length === 0 ? (
                    <S.EmptyReview>곧 좋은 후기가 찾아올 거에요.</S.EmptyReview>
                ) : (
                    <S.ReviewList>
                        {reviews.map((review) => (
                            <S.ReviewCard key={review.reviewId}>
                                <S.ReviewHeader>
                                    <S.ReviewUser>
                                        <S.ReviewAvatar>
                                            <img
                                                src={review.writerProfileImage || defaultProfile}
                                                alt="작성자 프로필"
                                            />
                                        </S.ReviewAvatar>
                                        <div>
                                            <S.ReviewNickname>{review.writerNickname}</S.ReviewNickname>
                                            <S.ReviewDate>{review.createdAt}</S.ReviewDate>
                                        </div>
                                    </S.ReviewUser>
                                    <S.ReviewRating>⭐ {review.rating}</S.ReviewRating>
                                </S.ReviewHeader>
                                <S.ReviewContent>{review.content}</S.ReviewContent>
                            </S.ReviewCard>
                        ))}
                    </S.ReviewList>
                )}
            </S.ReviewSection>
            <S.Divider />
        </S.Container>
    );
};

export default ExchangePostDetail;
