import React, { useEffect, useState } from 'react';
import * as S from './MyExchangeHistory.styles.ts';
import Pagination from '../../../components/common/pagination/Pagination';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



// ===== 내 거래내역 컴포넌트 =====

// 거래상태 옵션
const statusOptions = ['거래가능', '거래중', '거래완료'];

// 필터 탭 옵션
const FILTERS = ['전체', ...statusOptions] as const;
type FilterType = typeof FILTERS[number];

// 거래내역 데이터 인터페이스
interface ExchangeHistory {
    exchangePostId: number;
    imageUrl: string;
    title: string;
    opponentNickname: string;
    tradeMethod: 'DIRECT' | 'DELIVERY' | 'BOTH';
    tradedAt: string;

    seller: boolean;
    buyer: boolean;

    canSelectBuyer: boolean;   // 거래상대 미지정 여부
    reviewWritten: boolean;
    canWriteReview: boolean;
}

const MyExchangeHistory = () => {
    const [data, setData] = useState<ExchangeHistory[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    // 거래상대 선택 모달 상태
    const [showBuyerModal, setShowBuyerModal] = useState(false);
    const [targetPostId, setTargetPostId] = useState<number | null>(null);
    const [chatUsers, setChatUsers] = useState<any[]>([]);
    const [selectedBuyerId, setSelectedBuyerId] = useState<number | null>(null);

    /* ================= 데이터 조회 ================= */

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) return;

                const res = await axios.get(
                    '/api/my-exchange-posts/completed',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setData(res.data);
                setTotalPages(1); // 서버 페이징 붙기 전 임시
            } catch (e) {
                console.error('거래내역 조회 실패', e);
            }
        };

        fetchHistory();
    }, []);

    /* ================= 거래상대 선택 ================= */

    const openBuyerSelectModal = async (postId: number) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            const res = await axios.get(
                `/api/my-exchange-posts/${postId}/chat-users`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setChatUsers(res.data);
            setTargetPostId(postId);
            setShowBuyerModal(true);
        } catch (e) {
            alert('채팅 사용자 목록을 불러오지 못했습니다.');
        }
    };

    const confirmBuyerSelection = async () => {
        if (!targetPostId || !selectedBuyerId) return;

        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(
                `/api/my-exchange-posts/${targetPostId}/buyer`,
                { buyerId: selectedBuyerId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setShowBuyerModal(false);
            setSelectedBuyerId(null);
            setTargetPostId(null);

            // 갱신
            const refreshed = await axios.get(
                '/api/my-exchange-posts/completed',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData(refreshed.data);
        } catch {
            alert('거래상대 지정 실패');
        }
    };

    /* ================= 후기 버튼 렌더 ================= */

    const renderReviewButton = (item: ExchangeHistory) => {
        // 1️⃣ 거래완료 + 상대 미지정 (판매자)
        if (item.canSelectBuyer) {
            return (
                <S.ReviewButton
                    onClick={() => openBuyerSelectModal(item.exchangePostId)}
                >
                    거래상대 지정하기
                </S.ReviewButton>
            );
        }

        // 2️⃣ 구매자
        if (item.buyer) {
            if (item.reviewWritten) {
                return (
                    <S.ReviewButton
                        onClick={() => navigate('/reviews', { state: { tab: 'written' } })}
                    >
                        남긴 후기 보러가기
                    </S.ReviewButton>
                );
            }
            if (item.canWriteReview) {
                return (
                    <S.ReviewButton
                        onClick={() =>
                            navigate('/writereview', {
                                state: {
                                    exchangePostId: item.exchangePostId,
                                    postInfo: {
                                        thumbnailUrl: item.imageUrl,
                                        title: item.title,
                                        writerNickname: item.opponentNickname ?? '상대방',
                                    },
                                },
                            })
                        }
                    >
                        후기 작성하기
                    </S.ReviewButton>
                );
            }
            return <S.ReviewButton disabled>후기 작성 불가</S.ReviewButton>;
        }

        // 3️⃣ 판매자
        if (item.seller) {
            if (item.reviewWritten) {
                return (
                    <S.ReviewButton
                        onClick={() => navigate('/reviews', { state: { tab: 'received' } })}
                    >
                        받은 후기 보러가기
                    </S.ReviewButton>
                );
            }
            return (
                <S.ReviewButton
                    disabled
                    title="상대방이 아직 후기를 작성하지 않았어요"
                >
                    상대방 후기 없음
                </S.ReviewButton>
            );
        }

        return <S.ReviewButton disabled>-</S.ReviewButton>;
    };

    /* ================= 렌더 ================= */

    return (
        <S.Container>
            <S.Table>
                <thead>
                    <tr>
                        <th>사진</th>
                        <th>상품명</th>
                        <th>거래상대</th>
                        <th>거래방식</th>
                        <th>거래일자</th>
                        <th style={{ width: '160px' }}>후기</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(item => (
                        <tr key={item.exchangePostId}>
                            <td>
                                <S.Thumbnail src={item.imageUrl} />
                            </td>
                            <td>{item.title}</td>
                            <td>
                                {item.opponentNickname ?? '거래상대 미지정'}
                            </td>
                            <td>
                                {item.tradeMethod === 'DIRECT'
                                    ? '직거래'
                                    : item.tradeMethod === 'DELIVERY'
                                        ? '택배'
                                        : '직거래 · 택배'}
                            </td>
                            <td>{item.tradedAt}</td>
                            <td>{renderReviewButton(item)}</td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* ================= 거래상대 선택 모달 ================= */}
            {showBuyerModal && (
                <S.ModalOverlay>
                    <S.ModalContent>
                        <S.ModalTitle>거래상대 선택</S.ModalTitle>
                        <S.ModalDescription>
                            선택한 상대만 거래 후기를 작성할 수 있어요.
                        </S.ModalDescription>

                        <S.UserList>
                            {chatUsers.map(user => (
                                <S.UserItem
                                    key={user.userId}
                                    $selected={selectedBuyerId === user.userId}
                                    onClick={() => setSelectedBuyerId(user.userId)}
                                >
                                    <S.ProfileImage src={user.profileImageUrl} />
                                    <S.UserInfo>
                                        <S.NicknameRow>
                                            <S.Nickname>{user.nickname}</S.Nickname>
                                            <S.LastMessageTime>
                                                • {user.lastChatDaysAgo === 0 ? '오늘' : `${user.lastChatDaysAgo}일 전`}
                                            </S.LastMessageTime>
                                        </S.NicknameRow>

                                    </S.UserInfo>
                                </S.UserItem>
                            ))}
                        </S.UserList>

                        <S.ModalFooter>
                            <S.ModalButton onClick={() => setShowBuyerModal(false)}>
                                취소
                            </S.ModalButton>
                            <S.ModalButton onClick={confirmBuyerSelection}>
                                선택 완료
                            </S.ModalButton>
                        </S.ModalFooter>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}
        </S.Container>
    );
};

export default MyExchangeHistory;
