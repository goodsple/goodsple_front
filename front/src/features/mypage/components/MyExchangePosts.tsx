import React, { useEffect, useState } from 'react';
import * as S from './MyExchangePosts.styles';
import dropdownArrow from '../../../assets/images/dropdownArrow.png';
import Pagination from '../../../components/common/pagination/Pagination';
import * as PC from '../../../components/common/pagination/PaginationStyle';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// ===== 내 거래글 관리 컴포넌트 =====

// 거래상태 옵션
const statusOptions = ['거래가능', '거래중', '거래완료'];

// 필터 탭 옵션
const FILTERS = ['전체', ...statusOptions] as const;
type FilterType = typeof FILTERS[number];

// 거래글 데이터 인터페이스
interface ExchangePost {
    exchangePostId: number;
    imageUrl: string;
    exchangePostTitle: string;
    postTradeStatus: string;
    postTradeType: string;
    likedCount: number;
    updatedAt: string;
}

// JWT 토큰 페이로드 인터페이스
// sub 필드에 userId가 담겨있음
interface TokenPayload {
    sub: string; // ExchangePostDetail처럼 sub 필드 사용
}

// 거래 상대(채팅 유저) 인터페이스
interface ChatUser {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    lastChatDaysAgo: number;
    // badgeIcon?: string; // 배지 아이콘 URL (나중에 추가하기)
}

const MyExchangePosts = () => {
    // 드롭다운 열려있는 게시글 ID
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

    // 현재 선택된 필터
    const [activeFilter, setActiveFilter] = useState<FilterType>('전체');

    // 페이지네이션 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<ExchangePost[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5; // 페이지당 항목 수

    const navigate = useNavigate();

    // 서버 에서 사용하는 거래상태 매핑 (영어 -> 한글)
    const statusMap: Record<string, string> = {
        AVAILABLE: '거래가능',
        ONGOING: '거래중',
        COMPLETED: '거래완료',
    };

    // 거래상태 역매핑 (한글 -> 영어) 서버 전송용
    const statusReverseMap: Record<string, string> = {
        거래가능: 'AVAILABLE',
        거래중: 'ONGOING',
        거래완료: 'COMPLETED',
    };

    // 거래방식
    const tradeTypeMap: Record<string, string> = {
        DIRECT: '직거래',
        DELIVERY: '택배거래',
        BOTH: '직거래 • 택배거래',
    };

    // 거래상대 선택 모달 관련
    const [showBuyerModal, setShowBuyerModal] = useState(false);                    // 모달 표시 여부
    const [targetPostId, setTargetPostId] = useState<number | null>(null);          // 선택 중인 게시글 ID
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);                     // 채팅 사용자 목록
    const [selectedBuyerId, setSelectedBuyerId] = useState<number | null>(null);    // 선택된 거래상대 ID



    // 내 거래글 목록 조회
    // 필터, 페이지 변경 시 자동 조회
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) return;

                const decoded = jwtDecode<TokenPayload>(token);
                console.log('decoded token:', decoded);
                const userId = Number(decoded.sub); // 여기서 sub 사용
                // const userId = decoded.userId;
                if (!userId) return;

                console.log('Fetching data with userId:', userId, 'status:', activeFilter);

                const statusReverseMap: Record<string, string> = {
                    거래가능: 'AVAILABLE',
                    거래중: 'ONGOING',
                    거래완료: 'COMPLETED',
                };

                const res = await axios.get('/api/my-exchange-posts', {
                    params: {
                        userId,
                        // '전체' 필터 선택 시 status 파라미터에서 제외
                        status: activeFilter === '전체' ? null : statusReverseMap[activeFilter],
                        page: currentPage,
                        size: itemsPerPage,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // 디버깅용 콘솔 로그
                console.log("res.data.posts:", res.data.posts);
                console.log("imageUrl:", res.data.posts[0].imageUrl);

                setData(res.data.posts);
                setTotalPages(Math.ceil(res.data.totalCount / itemsPerPage));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [activeFilter, currentPage]);

    // 필터 변경 시 페이지 초기화
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    // 드롭다운 토글 핸들러
    const toggleDropdown = (id: number) => {
        setOpenDropdownId(prev => (prev === id ? null : id));
    };

    // 거래상태 변경 핸들러
    // 거래완료 선택 시 거래상대 선택 모달 오픈
    const handleStatusChange = async (id: number, newStatusKor: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            const decoded = jwtDecode<TokenPayload>(token); // 여기서 다시 디코딩
            const userId = Number(decoded.sub);

            // 한글 상태 -> 서버에 전송할 영어 상태
            const englishStatus = statusReverseMap[newStatusKor as keyof typeof statusReverseMap];

            // 서버로 거래상태 변경 요청
            await axios.patch(
                `/api/my-exchange-posts/${id}/status`,
                null,
                {
                    params: { userId, status: englishStatus },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // 상태 변경 후 UI 갱신
            setData(prev =>
                prev.map(item =>
                    item.exchangePostId === id
                        ? { ...item, postTradeStatus: newStatusKor } : item
                )
            );

            setOpenDropdownId(null);

            // 거래완료 시 거래상대 선택 모달 오픈
            if (englishStatus === 'COMPLETED') {
                fetchChatUsers(id);
            }
        } catch (err) {
            console.error(err);
            alert('거래상태 변경에 실패했습니다.');
        }
    };

    // 해당 게시글에 연결된 채팅 사용자 목록 조회
    // 판매자만 거래상대 선택 가능 (백엔드에서 검증)
    const fetchChatUsers = async (postId: number) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            const res = await axios.get(
                `/api/my-exchange-posts/${postId}/chat-users`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setChatUsers(res.data); // [{ userId, nickname }]
            setTargetPostId(postId);
            setShowBuyerModal(true);

        } catch (err) {
            console.error(err);
            alert('채팅 상대 목록을 불러오지 못했습니다.');
        }
    };

    // 거래상대 선택(확정) 모달
    const confirmBuyerSelection = async () => {
        if (!selectedBuyerId || !targetPostId) return;

        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(
                `/api/my-exchange-posts/${targetPostId}/buyer`,
                { buyerId: selectedBuyerId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // 성공 시 모달 닫기 및 상태 초기화
            setShowBuyerModal(false);
            setSelectedBuyerId(null);
            setTargetPostId(null);
        } catch (e) {
            alert('거래 상대 지정 실패');
        }
    };

    // 거래상대 나중에 선택
    // 거래완료 상태 유지, buyerId는 null로 저장됨
    const skipBuyerSelection = () => {
        setShowBuyerModal(false);
        setSelectedBuyerId(null);
        setTargetPostId(null);
    };



    // 거래글 삭제 핸들러
    const handleDelete = async (postId: number) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            const decoded: TokenPayload = jwtDecode(token);
            const userId = Number(decoded.sub);

            await axios.delete(`/api/exchange-posts/${postId}`, {
                params: { userId },
                headers: { Authorization: `Bearer ${token}` }
            });

            // 삭제 후 UI에서 해당 항목 제거
            setData(prev => prev.filter(item => item.exchangePostId !== postId));
            // 필요 시 totalPages 재계산
            setTotalPages(prev => Math.ceil((prev * itemsPerPage - 1) / itemsPerPage));
        } catch (err) {
            console.error(err);
            alert('삭제 실패');
        }
    };

    // 필터 클릭 핸들러
    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    // 현재 페이지에 해당하는 데이터만 추출
    const paginatedData = data; // 이미 서버에서 페이지네이션된 데이터를 받으므로 그대로 사용

    return (
        <S.Container>
            <S.TabFilterWrapper>
                <S.FilterGroup>
                    {FILTERS.map(filter => (
                        <S.FilterButton
                            key={filter}
                            $active={filter === activeFilter}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter}
                        </S.FilterButton>
                    ))}
                </S.FilterGroup>
            </S.TabFilterWrapper>

            <S.Table>
                <thead>
                    <tr>
                        <th>사진</th>
                        <th>상품명</th>
                        <th>거래상태</th>
                        <th>거래방식</th>
                        <th>즐겨찾기</th>
                        <th>최근 수정일</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(item => (
                        <tr key={item.exchangePostId}
                            onClick={() => navigate(`/exchange/detail/${item.exchangePostId}`)} style={{ cursor: 'pointer' }}>
                            <td>
                                <S.Thumbnail src={item.imageUrl} alt="상품 이미지" />
                            </td>
                            <td>{item.exchangePostTitle}</td>
                            <td>
                                <S.StatusDropdownWrapper>
                                    <S.StatusButton
                                        onClick={(e) => {
                                            e.stopPropagation();    // 드롭다운 클릭 시 행 클릭 이벤트 방지 (버블링)
                                            toggleDropdown(item.exchangePostId)
                                        }}
                                        selected={item.postTradeStatus}
                                    >
                                        {statusMap[item.postTradeStatus] || item.postTradeStatus}
                                        <S.DropdownIcon src={dropdownArrow} alt="드롭다운 화살표" />
                                    </S.StatusButton>
                                    {openDropdownId === item.exchangePostId && (
                                        <S.StatusOptions>
                                            {statusOptions.map(option => (
                                                <S.StatusOption
                                                    key={option}
                                                    $selected={statusMap[item.postTradeStatus] === option}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatusChange(item.exchangePostId, option)
                                                    }}
                                                >
                                                    {option}
                                                </S.StatusOption>
                                            ))}
                                        </S.StatusOptions>
                                    )}
                                </S.StatusDropdownWrapper>
                            </td>
                            <td>{tradeTypeMap[item.postTradeType] || item.postTradeType}</td>
                            <td>{item.likedCount}</td>
                            <td>{item.updatedAt}</td>
                            <td>
                                <S.ManageButton
                                    onClick={(e) => {
                                        e.stopPropagation(); // 행 클릭 이벤트 방지
                                        navigate(`/exchange/edit/${item.exchangePostId}`);
                                    }}
                                >
                                    수정
                                </S.ManageButton>
                                <S.ManageButton
                                    onClick={(e) => {
                                        e.stopPropagation(); // 행 클릭 이벤트 방지
                                        if (window.confirm('정말 삭제하시겠습니까?')) {
                                            handleDelete(item.exchangePostId);
                                        }
                                    }}
                                >
                                    삭제
                                </S.ManageButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>

            {totalPages > 1 && (
                <PC.PaginationContainer>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </PC.PaginationContainer>
            )}

            {/* 거래상대 선택 모달 */}
            {showBuyerModal && (
                <S.ModalOverlay>
                    <S.ModalContent>
                        <S.ModalTitle>최근 대화한 계정</S.ModalTitle>
                        {/* <S.RecentTitle>최근 대화한 계정</S.RecentTitle> */}

                        <S.UserList>
                            {chatUsers.map(user => (
                                <S.UserItem
                                    key={user.userId}
                                    $selected={selectedBuyerId === user.userId}
                                    onClick={() => setSelectedBuyerId(user.userId)}
                                >
                                    <S.ProfileImage src={user.profileImageUrl || '/default-profile.png'} />
                                    <S.UserInfo>
                                        <S.NicknameRow>
                                            <S.Nickname>{user.nickname}</S.Nickname>
                                            {/* 배지 나중에 연결하기 */}
                                            <S.BadgeIcon src="/LV1.png" alt="배지 아이콘" />
                                            {/* {user.badgeIcon && <S.BadgeIcon src={user.badgeIcon} />} */}
                                        </S.NicknameRow>
                                        <S.LastMessageTime>
                                            {/* lastChatDaysAgo === 0 이면 '오늘'로 표시 */}
                                            • {user.lastChatDaysAgo === 0
                                                ? '오늘'
                                                : `${user.lastChatDaysAgo}일 전`}
                                        </S.LastMessageTime>
                                    </S.UserInfo>
                                </S.UserItem>
                            ))}
                        </S.UserList>

                        <S.ModalFooter>
                            <S.ModalButton onClick={skipBuyerSelection}>
                                나중에 선택
                            </S.ModalButton>
                            <S.ModalButton

                                onClick={confirmBuyerSelection}
                            >
                                선택 완료
                            </S.ModalButton>
                        </S.ModalFooter>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}
        </S.Container>
    );
};

export default MyExchangePosts;
