import React, { useEffect, useState } from 'react';
import * as S from './AdminNoticeList.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../../components/common/pagination/Pagination'; // 경로 맞게 조정


interface Notice {
    noticeId: number;
    noticeTitle: string;
    noticeContent: string;
    noticeCreatedAt: string;
    noticeUpdatedAt?: string;
    attachments?: number;
    author?: string;
    isPopup: boolean;
    popupStart?: string;
    popupEnd?: string;
}


const AdminNoticeList = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    // 날짜를 YYYY-MM-DD 형식으로 포맷하는 헬퍼 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 날짜를 (MM.DD) 형식으로 포맷하는 헬퍼 함수
    const formatMonthDay = (dateString: string) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `(${month}.${day})`;
    };

    const fetchNotices = async (keyword: string = '', page: number = 1) => {
        try {
            const response = await axios.get('/api/admin/notices', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    title: keyword,    // 백엔드 NoticeListFilterDto의 keyword
                    page,
                    size: 10,
                },
            });

            const { data, totalPages, page: current } = response.data;

            setNotices(data); // 데이터 구조에 맞게 수정
            setTotalPages(totalPages);
            setCurrentPage(current);

            console.log('공지사항 목록:', response.data.data);

        } catch (error) {
            console.error('공지사항 목록 불러오기 실패:', error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    // 공지사항 검색
    const handleSearch = () => {
        fetchNotices(searchTerm, 1);
        console.log('검색어:', searchTerm);
    };

    // 공지사항 등록
    const handleRegister = () => {
        navigate('/admin/notice/new'); // 버튼 클릭 시 이동
    };

    // 공지사항 수정
    const handleEdit = (noticeId: number) => {
        navigate(`/admin/notice/${noticeId}/edit`);
    };

    // 공지사항 삭제
    const handleDelete = async (noticeId: number) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await axios.delete(`/api/admin/notices/${noticeId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // 삭제 후 목록 갱신
            fetchNotices(searchTerm);
        } catch (error) {
            console.error('공지사항 삭제 실패:', error);
        }
    };


    return (
        <S.Container>
            <S.TopBar>
                <S.RegisterButton onClick={handleRegister}>공지 등록</S.RegisterButton>
                <S.SearchWrapper>
                    <S.SearchInput
                        type="text"
                        placeholder="공지 제목 검색"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <S.SearchButton onClick={handleSearch}>검색</S.SearchButton>
                </S.SearchWrapper>
            </S.TopBar>

            <S.Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>등록일(수정일)</th>
                        <th>첨부파일 수</th>
                        <th>등록자</th>
                        <th>팝업여부</th>
                        <th>팝업기간</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((item, idx) => (
                        <tr key={item.noticeId}>
                            <td>{(currentPage - 1) * 10 + (idx + 1)}</td>
                            <td>{item.noticeTitle}</td>
                            <td>
                                {formatDate(item.noticeCreatedAt)}
                                {item.noticeUpdatedAt ? ` ${formatMonthDay(item.noticeUpdatedAt)}` : ''}
                            </td>
                            <td>{item.attachments ?? 0}</td>
                            <td>{item.author ?? '관리자'}</td>
                            <td>{item.isPopup ? 'Y' : 'N'}</td>
                            <td>
                                {item.isPopup && item.popupStart && item.popupEnd ? (
                                    `${formatDate(item.popupStart)} ~ ${formatDate(item.popupEnd)}`
                                ) : (
                                    '-'
                                )}
                                {/* {item.popupStart && item.popupEnd
                                    ? `${item.popupStart} ~ ${item.popupEnd}`
                                    : '-'} */}
                            </td>
                            <td>
                                <S.ActionButton onClick={() => handleEdit(item.noticeId)}>수정</S.ActionButton>
                                <S.ActionButton onClick={() => handleDelete(item.noticeId)}>삭제</S.ActionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => fetchNotices(searchTerm, page)}
            />
        </S.Container>
    );
};

export default AdminNoticeList;
