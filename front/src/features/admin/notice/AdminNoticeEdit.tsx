import React, { useEffect, useState } from 'react';
import * as S from './AdminNotice.styles';
import axios from 'axios';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import jwtDecode from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';

const AdminNoticeEdit = () => {
    const { noticeId } = useParams<{ noticeId: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [popupEnabled, setPopupEnabled] = useState(false);
    const [popupStart, setPopupStart] = useState('');
    const [popupEnd, setPopupEnd] = useState('');
    const [popupImage, setPopupImage] = useState<File | null>(null);
    const [popupSummary, setPopupSummary] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    let userId = null;

    if (accessToken) {
        const decoded: any = jwtDecode(accessToken);
        userId = decoded.userId || decoded.id || decoded.sub;
    }

    // 기존 공지사항 데이터 불러오기
    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`/api/admin/notices/${noticeId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = response.data;
                setTitle(data.noticeTitle);
                setContent(data.noticeContent);
                setPopupEnabled(data.isPopup);
                if (data.isPopup && data.popupInfo) {
                    setPopupStart(data.popupInfo.popupStart || '');
                    setPopupEnd(data.popupInfo.popupEnd || '');
                    setPopupImage(null); // 실제 파일은 불러오기 힘들고 URL 표시만 가능
                    setPopupSummary(data.popupInfo.popupSummary || '');
                }
            } catch (error) {
                console.error('공지사항 불러오기 실패:', error);
                alert('공지사항 불러오기에 실패했습니다.');
            }
        };
        if (noticeId) fetchNotice();
    }, [noticeId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const noticeData = {
                userId,
                noticeTitle: title,
                noticeContent: content,
                isPopup: popupEnabled,
                attachments: [], // 파일 업로드 필요 시 추가
                popupInfo: popupEnabled
                    ? {
                        popupStart: popupStart || null,
                        popupEnd: popupEnd || null,
                        popupImageUrl: popupImage ? URL.createObjectURL(popupImage) : null,
                        popupSummary: popupSummary || null,
                    }
                    : null,
            };

            await axios.put(`/api/admin/notices/${noticeId}`, noticeData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            setModalMessage('공지사항이 수정되었습니다.');
            setIsModalOpen(true);
        } catch (error) {
            console.error('공지사항 수정 실패:', error);
            alert('공지사항 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <S.FormContainer onSubmit={handleSubmit}>
                <S.FormGroup>
                    <S.Label>공지 제목</S.Label>
                    <S.Input
                        maxLength={40}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <S.CharCount>{title.length}/40</S.CharCount>
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label>공지 내용</S.Label>
                    <S.Textarea
                        maxLength={2000}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <S.CharCount>{content.length}/2000</S.CharCount>
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label>첨부 파일</S.Label>
                    <S.FileInput type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </S.FormGroup>

                <S.Divider />

                <S.FormGroup>
                    <S.CheckboxLabel>
                        팝업 등록
                        <input type="checkbox" checked={popupEnabled} onChange={() => setPopupEnabled(!popupEnabled)} />
                    </S.CheckboxLabel>
                </S.FormGroup>

                {popupEnabled && (
                    <>
                        <S.FormGroup>
                            <S.Label>팝업 노출기간</S.Label>
                            <S.DateRangeWrapper>
                                <S.Input type="date" value={popupStart} onChange={(e) => setPopupStart(e.target.value)} />
                                <span>~</span>
                                <S.Input type="date" value={popupEnd} onChange={(e) => setPopupEnd(e.target.value)} />
                            </S.DateRangeWrapper>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>팝업용 이미지</S.Label>
                            <S.FileInput type="file" onChange={(e) => setPopupImage(e.target.files?.[0] || null)} />
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>팝업 요약 메세지</S.Label>
                            <S.Textarea
                                maxLength={203}
                                value={popupSummary}
                                onChange={(e) => setPopupSummary(e.target.value)}
                            />
                            <S.CharCount>{popupSummary.length}/203</S.CharCount>
                        </S.FormGroup>
                    </>
                )}

                <S.SubmitWrapper>
                    <S.SubmitButton type="submit">수정하기</S.SubmitButton>
                </S.SubmitWrapper>
            </S.FormContainer>

            <ConfirmModal
                isOpen={isModalOpen}
                content={modalMessage}
                onConfirm={() => {
                    setIsModalOpen(false);
                    navigate('/admin/notice'); // 수정 완료 후 목록 페이지 이동
                }}
            />
        </>
    );
};

export default AdminNoticeEdit;
