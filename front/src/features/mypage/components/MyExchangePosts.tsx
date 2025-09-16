// import React, { useEffect, useState } from 'react';
// import * as S from './MyExchangePosts.styles';
// import dropdownArrow from '../../../assets/images/dropdownArrow.png';
// import Pagination from '../../../components/common/pagination/Pagination';
// import * as PC from '../../../components/common/pagination/PaginationStyle.ts';
// import axios from 'axios';


// const statusOptions = ['거래가능', '거래중', '거래완료'];
// const FILTERS = ['전체', ...statusOptions] as const;
// type FilterType = typeof FILTERS[number];


// interface ExchangePost {
//     exchangePostId: number;
//     imageUrl: string;
//     exchangePostTitle: string;
//     postTradeStatus: string;
//     postTradeType: string;
//     likedCount: number;
//     updatedAt: string;
// }

// interface TokenPayload {
//     userId: number;

// }

// const MyExchangePosts = () => {

//     const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
//     const [activeFilter, setActiveFilter] = useState<FilterType>('전체');
//     const [currentPage, setCurrentPage] = useState(1);

//     const [data, setData] = useState<ExchangePost[]>([]);
//     const [totalPages, setTotalPages] = useState(1);

//     // const [error, setError] = useState<string | null>(null); // 🔹 에러 메시지

//     const itemsPerPage = 5;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
//                 if (!token) {
//                     return;
//                 }

//                 console.log('JWT 토큰:', token);

//                 // 토큰에서 userId 추출
//                 const decoded = JwtDecode<TokenPayload>(token);
//                 console.log('디코드:', decoded);

//                 const userId = decoded.userId ?? (decoded.sub ? Number(decoded.sub) : null);
//                 if (!userId) return;

//                 console.log('axios 요청 전 userId:', userId, 'status:', activeFilter);

//                 const res = await axios.get('http://localhost:8080/api/my-exchange-posts', {
//                     params: {
//                         userId,
//                         status: activeFilter === '전체' ? null : activeFilter,
//                         page: currentPage,
//                         size: itemsPerPage,
//                     },
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 console.log('API 응답:', res.data)

//                 setData(res.data.posts);
//                 setTotalPages(Math.ceil(res.data.totalCount / itemsPerPage));
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchData();
//     }, [activeFilter, currentPage]);


//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const token = localStorage.getItem('accessToken'); // JWT 토큰
//     //             const res = await axios.get('/api/my-exchange-posts', {
//     //                 params: {
//     //                     // userId: 1, // 로그인 사용자 ID (실제는 토큰에서 추출)
//     //                     status: activeFilter === '전체' ? null : activeFilter,
//     //                     page: currentPage,
//     //                     size: itemsPerPage,
//     //                 },
//     //                 headers: {
//     //                     Authorization: `Bearer ${token}`, // 토큰 헤더
//     //                 },

//     //             });
//     //             setData(res.data.posts);
//     //             setTotalPages(Math.ceil(res.data.totalCount / itemsPerPage));
//     //         } catch (err) {
//     //             console.error(err);
//     //         }
//     //     };
//     //     fetchData();
//     // }, [activeFilter, currentPage]);

//     // const [data, setData] = useState([
//     //     {
//     //         id: 1,
//     //         imageUrl: sampleImage1,
//     //         title: '포토카드 A',
//     //         status: '거래중',
//     //         method: '직거래, 택배거래',
//     //         likedCount: 12,
//     //         updatedAt: '2025.07.30 14:45',
//     //     },
//     //     {
//     //         id: 2,
//     //         imageUrl: sampleImage2,
//     //         title: '테스트글입니다 클릭금지인데 글자수가 어디까지 갈까나요 과연 와우 40자다',
//     //         status: '거래가능',
//     //         method: '택배거래',
//     //         likedCount: 5,
//     //         updatedAt: '2025.07.25 11:30',
//     //     },
//     //     {
//     //         id: 3,
//     //         imageUrl: sampleImage3,
//     //         title: '테스트글입니다 포카4번',
//     //         status: '거래가능',
//     //         method: '택배거래',
//     //         likedCount: 5,
//     //         updatedAt: '2025.07.25 11:30',
//     //     },
//     //     {
//     //         id: 4,
//     //         imageUrl: sampleImage1,
//     //         title: '테스트글입니다 포카4번',
//     //         status: '거래가능',
//     //         method: '택배거래',
//     //         likedCount: 5,
//     //         updatedAt: '2025.07.25 11:30',
//     //     },
//     //     {
//     //         id: 5,
//     //         imageUrl: sampleImage1,
//     //         title: '테스트글입니다 포카4번',
//     //         status: '거래가능',
//     //         method: '택배거래',
//     //         likedCount: 5,
//     //         updatedAt: '2025.07.25 11:30',
//     //     },
//     //     {
//     //         id: 6,
//     //         imageUrl: sampleImage1,
//     //         title: '테스트글입니다 포카4번',
//     //         status: '거래가능',
//     //         method: '택배거래',
//     //         likedCount: 5,
//     //         updatedAt: '2025.07.25 11:30',
//     //     },
//     // ]);



//     // const filteredData =
//     //     activeFilter === '전체' ? data : data.filter(d => d.status === activeFilter);

//     // const startIndex = (currentPage - 1) * itemsPerPage;
//     // const endIndex = startIndex + itemsPerPage;
//     // const paginatedData = filteredData.slice(startIndex, endIndex);
//     // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [activeFilter]);


//     const toggleDropdown = (id: number) => {
//         setOpenDropdownId(prev => (prev === id ? null : id));
//     };

//     const handleStatusChange = (id: number, newStatus: string) => {
//         setData(prev =>
//             prev.map(item =>
//                 item.exchangePostId === id ? { ...item, postTradeStatus: newStatus } : item
//             )
//         );
//         setOpenDropdownId(null);
//     };

//     const handleFilterClick = (filter: FilterType) => {
//         setActiveFilter(filter);
//     };

//     const filteredData =
//         activeFilter === '전체'
//             ? data
//             : data.filter(d => d.postTradeStatus === activeFilter);

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedData = filteredData.slice(startIndex, endIndex);


//     return (
//         <S.Container>
//             <S.TabFilterWrapper>

//                 <S.FilterGroup>
//                     {FILTERS.map(filter => (
//                         <S.FilterButton
//                             key={filter}
//                             $active={filter === activeFilter}
//                             onClick={() => handleFilterClick(filter)}
//                         >
//                             {filter}
//                         </S.FilterButton>
//                     ))}
//                 </S.FilterGroup>
//             </S.TabFilterWrapper>

//             <S.Table>
//                 <thead>
//                     <tr>
//                         <th>사진</th>
//                         <th>상품명</th>
//                         <th>거래상태</th>
//                         <th>거래방식</th>
//                         <th>즐겨찾기</th>
//                         <th>최근 수정일</th>
//                         <th>관리</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {paginatedData.map(item => (
//                         <tr key={item.exchangePostId}>
//                             <td>
//                                 <S.Thumbnail src={item.imageUrl} alt="상품 이미지" />
//                             </td>
//                             <td>
//                                 {item.exchangePostTitle}
//                             </td>
//                             <td>
//                                 <S.StatusDropdownWrapper>
//                                     <S.StatusButton onClick={() => toggleDropdown(item.exchangePostId)}
//                                         selected={item.postTradeStatus}
//                                     >
//                                         {item.postTradeStatus}
//                                         <S.DropdownIcon src={dropdownArrow} alt="드롭다운 화살표" />
//                                     </S.StatusButton>
//                                     {openDropdownId === item.exchangePostId && (
//                                         <S.StatusOptions>
//                                             {statusOptions.map(option => (
//                                                 <S.StatusOption
//                                                     key={option}
//                                                     selected={option === item.postTradeStatus}
//                                                     onClick={() => handleStatusChange(item.exchangePostId, option)}
//                                                 >
//                                                     {option}
//                                                 </S.StatusOption>
//                                             ))}
//                                         </S.StatusOptions>
//                                     )}
//                                 </S.StatusDropdownWrapper>
//                             </td>
//                             <td>{item.postTradeType}</td>
//                             <td>{item.likedCount}</td>
//                             <td>{item.updatedAt}</td>
//                             {true && (
//                                 <td>
//                                     <S.ManageButton>수정</S.ManageButton>
//                                     <S.ManageButton>삭제</S.ManageButton>
//                                 </td>
//                             )}
//                         </tr>
//                     ))}
//                 </tbody>
//             </S.Table>

//             {totalPages > 1 && (
//                 <PC.PaginationContainer>
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={setCurrentPage}
//                     />
//                 </PC.PaginationContainer>
//             )}
//         </S.Container>
//     );
// };

// export default MyExchangePosts;




import React, { useEffect, useState } from 'react';
import * as S from './MyExchangePosts.styles';
import dropdownArrow from '../../../assets/images/dropdownArrow.png';
import Pagination from '../../../components/common/pagination/Pagination';
import * as PC from '../../../components/common/pagination/PaginationStyle';
import axios from 'axios';
import jwtDecode from 'jwt-decode';




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
    const itemsPerPage = 5;

    // 거래상태
    const statusMap: Record<string, string> = {
        AVAILABLE: '거래가능',
        IN_PROGRESS: '거래중',
        DONE: '거래완료',
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

                const res = await axios.get('/api/my-exchange-posts', {
                    params: {
                        userId,
                        status: activeFilter === '전체' ? null : activeFilter,
                        page: currentPage,
                        size: itemsPerPage,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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

    const handleStatusChange = (id: number, newStatus: string) => {
        setData(prev =>
            prev.map(item =>
                item.exchangePostId === id ? { ...item, postTradeStatus: newStatus } : item
            )
        );
        setOpenDropdownId(null);
    };

    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    const filteredData =
        activeFilter === '전체'
            ? data
            : data.filter(d => d.postTradeStatus === activeFilter);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

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
                        <tr key={item.exchangePostId}>
                            <td>
                                <S.Thumbnail src={item.imageUrl} alt="상품 이미지" />
                            </td>
                            <td>{item.exchangePostTitle}</td>
                            <td>
                                <S.StatusDropdownWrapper>
                                    <S.StatusButton
                                        onClick={() => toggleDropdown(item.exchangePostId)}
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
                                                    onClick={() => handleStatusChange(item.exchangePostId, option)}
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
                                <S.ManageButton>수정</S.ManageButton>
                                <S.ManageButton>삭제</S.ManageButton>
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
