import React, { useEffect, useState } from 'react';
import * as S from './MyExchangePosts.styles';
import dropdownArrow from '../../../assets/images/dropdownArrow.png';
import Pagination from '../../../components/common/pagination/Pagination';
import * as PC from '../../../components/common/pagination/PaginationStyle';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const statusOptions = ['거래가능', '거래중', '거래완료'];

const FILTERS = ['전체', ...statusOptions] as const;
type FilterType = typeof FILTERS[number];

interface ExchangePost {
    exchangePostId: number;
    imageUrl: string;
    exchangePostTitle: string;
    postTradeStatus: string;
    postTradeType: string;
    likedCount: number;
    updatedAt: string;
}

interface TokenPayload {
    sub: string; // ExchangePostDetail처럼 sub 필드 사용
}

const MyExchangePosts = () => {
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<ExchangePost[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5; // 페이지당 항목 수

    const navigate = useNavigate();

    // 거래상태
    const statusMap: Record<string, string> = {
        AVAILABLE: '거래가능',
        ONGOING: '거래중',
        COMPLETED: '거래완료',
    };

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


    // API 호출
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
                        status: activeFilter === '전체' ? null : statusReverseMap[activeFilter],
                        page: currentPage,
                        size: itemsPerPage,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data.posts);

                setData(res.data.posts);
                setTotalPages(Math.ceil(res.data.totalCount / itemsPerPage));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [activeFilter, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    const toggleDropdown = (id: number) => {
        setOpenDropdownId(prev => (prev === id ? null : id));
    };

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
        } catch (err) {
            console.error(err);
            alert('거래상태 변경에 실패했습니다.');
        }
    };

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
        </S.Container>
    );
};

export default MyExchangePosts;
