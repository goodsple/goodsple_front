import React, { useEffect, useState } from 'react';
import * as S from './AdminNoticeList.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Notice {
    noticeId: number;
    noticeTitle: string;
    noticeContent: string;
    noticeCreatedAt: string;
    noticeUpdatedAt?: string;
    attachments?: number;
    author?: string;
    isPopup: boolean;
}


const AdminNoticeList = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    const fetchNotices = async (keyword: string = '') => {
        try {
            const response = await axios.get('/api/admin/notices', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    keyword,    // 백엔드 NoticeListFilterDto의 keyword
                    page: 0,
                    size: 20,
                },
            });
            setNotices(response.data);
        } catch (error) {
            console.error('공지사항 목록 불러오기 실패:', error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    // 공지사항 검색
    const handleSearch = () => {
        fetchNotices(searchTerm);
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
                            <td>{idx + 1}</td>
                            <td>{item.noticeTitle}</td>
                            <td>
                                {new Date(item.noticeCreatedAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                                {item.noticeUpdatedAt ? ` (${new Date(item.noticeUpdatedAt).getMonth() + 1}.${String(new Date(item.noticeUpdatedAt).getDate()).padStart(2, '0')})` : ''}
                            </td>
                            <td>{item.attachments ?? 0}</td>
                            <td>{item.author ?? '관리자'}</td>
                            <td>{item.isPopup ? 'Y' : 'N'}</td>
                            <td>
                                {item.popupStart && item.popupEnd
                                    ? `${item.popupStart} ~ ${item.popupEnd}`
                                    : '-'}
                            </td>
                            <td>
                                <S.ActionButton onClick={() => handleEdit(item.noticeId)}>수정</S.ActionButton>
                                <S.ActionButton onClick={() => handleDelete(item.noticeId)}>삭제</S.ActionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default AdminNoticeList;
