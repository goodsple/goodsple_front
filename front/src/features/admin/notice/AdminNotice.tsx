import React, { useState } from 'react';
import * as S from './AdminNotice.styles';

const AdminNotice = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [popupEnabled, setPopupEnabled] = useState(false);
    const [popupStart, setPopupStart] = useState('');
    const [popupEnd, setPopupEnd] = useState('');
    const [popupImage, setPopupImage] = useState<File | null>(null);
    const [popupSummary, setPopupSummary] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 등록 로직 추가
    };

    return (
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
    );
};

export default AdminNotice;