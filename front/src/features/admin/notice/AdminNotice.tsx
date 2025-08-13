import React, { useState } from 'react';
import * as S from './AdminNotice.styles';
import axios from 'axios';
import { NoticeTitle } from '../../notice/NoticeDetail.styles';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { jwtDecode } from 'jwt-decode';

const AdminNotice = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [popupEnabled, setPopupEnabled] = useState(false);
    const [popupStart, setPopupStart] = useState('');
    const [popupEnd, setPopupEnd] = useState('');
    const [popupImage, setPopupImage] = useState<File | null>(null);
    const [popupSummary, setPopupSummary] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [modalMessage, setModalMessage] = useState('');  // 모달에 보여줄 메시지

    const accessToken = localStorage.getItem('accessToken');
    let userId = null;

    if (accessToken) {
        const decoded: any = jwtDecode(accessToken);
        console.log("Decoded Token:", decoded); // 실제 필드 확인
        userId = decoded.userId || decoded.id || decoded.sub; // 실제 키 맞춰서 수정
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 1. 공지사항 데이터 기본
            const noticeData = {
                userId,
                noticeTitle: title,
                noticeContent: content,
                noticeCreatedAt: new Date().toISOString(),
                isPopup: popupEnabled,
                popupStart: popupEnabled ? popupStart : null,
                popupEnd: popupEnabled ? popupEnd : null,
                popupSummary: popupEnabled ? popupSummary : null,
                // 첨부파일은 파일 업로드 API와 별도 처리하거나 Multipart로 전송해야 함
            };

            // 2. FormData로 파일 포함해서 보내기 (추후 다시 추가 예정)
            // const formData = new FormData();
            // formData.append('noticeDto', new Blob([JSON.stringify(noticeData)], { type: "application/json" }));
            // if (file) {
            //     formData.append('attachments', file);
            // }
            // if (popupEnabled && popupImage) {
            //     formData.append('attachments', popupImage);
            // }

            // 3. POST 요청 (백엔드 API 주소 확인 필요)
            await axios.post('/api/notices', noticeData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            setModalMessage('공지사항이 등록되었습니다.');
            setIsModalOpen(true);

            setTitle('');
            setContent('');
            setFile(null);
            setPopupEnabled(false);
            setPopupStart('');
            setPopupEnd('');
            setPopupImage(null);
            setPopupSummary('');

        } catch (error) {
            console.error('공지사항 등록 실패:', error);
            alert('공지사항 등록 중 오류가 발생했습니다.');
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
                        onChange={e => setTitle(e.target.value)}
                    />
                    <S.CharCount>{title.length}/40</S.CharCount>
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label>공지 내용</S.Label>
                    <S.Textarea
                        maxLength={2000}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <S.CharCount>{content.length}/2000</S.CharCount>
                </S.FormGroup>

                <S.FormGroup>
                    <S.Label>첨부 파일</S.Label>
                    <S.FileInput type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
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
                                <S.Input type="date" value={popupStart} onChange={e => setPopupStart(e.target.value)} />
                                <span>~</span>
                                <S.Input type="date" value={popupEnd} onChange={e => setPopupEnd(e.target.value)} />
                            </S.DateRangeWrapper>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>팝업용 이미지</S.Label>
                            <S.FileInput type="file" onChange={e => setPopupImage(e.target.files?.[0] || null)} />
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>팝업 요약 메세지</S.Label>
                            <S.Textarea
                                maxLength={203}
                                value={popupSummary}
                                onChange={e => setPopupSummary(e.target.value)}
                            />
                            <S.CharCount>{popupSummary.length}/203</S.CharCount>
                        </S.FormGroup>
                    </>
                )}

                <S.SubmitWrapper>
                    <S.SubmitButton type="submit">등록하기</S.SubmitButton>
                </S.SubmitWrapper>
            </S.FormContainer>

            <ConfirmModal
                isOpen={isModalOpen}
                content={modalMessage}          // 메시지를 content로 전달
                onConfirm={() => setIsModalOpen(false)} // 확인 버튼 누르면 모달 닫기
            />

        </>
    );
};

export default AdminNotice;