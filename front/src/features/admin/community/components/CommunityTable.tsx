import type React from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './CommunityTableStyle';

export interface CommunitySummary {
    date: string;
    commRoomId: string;
    participantCount: number;
    messageCount: number;
    lastMessage: string;
}

interface Props {
    data: CommunitySummary[];
    itemsPerPage: number;
}

const CommunityTable: React.FC<Props> = ({ data, itemsPerPage }) => {
    const navigate = useNavigate();
    const emptyRows = itemsPerPage - data.length;

    const handleDetailClick = (r: CommunitySummary) => {
        if (!r.date || !r.commRoomId) {
            alert("상세보기 정보를 불러올 수 없습니다.");
            return;
        }
        navigate('/admin/community/detail', {
            state: {
                date: r.date,
                commRoomId: r.commRoomId,
                userCount: r.participantCount,
                messageCount: r.messageCount,
            },
        });
    };

    return (
        <s.CommTable>
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>채팅방 ID</th>
                    <th>참여자 수</th>
                    <th>메시지 수</th>
                    <th>마지막 메시지</th>
                    <th>상세보기</th>
                </tr>
            </thead>
            <tbody>
                {data.map((r, index) => (
                    <tr key={index}>
                        <td>{r.date}</td>
                        <td>{r.commRoomId}</td>
                        <td>{r.participantCount}</td>
                        <td>{r.messageCount}</td>
                        <td>{r.lastMessage}</td>
                        <td>
                            <button onClick={() => handleDetailClick(r)}>
                                대화 상세보기
                            </button>
                        </td>
                    </tr>
                ))}

                {emptyRows > 0 &&
                    Array.from({ length: emptyRows }).map((_, index) => (
                        <tr key={`empty-${index}`}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <td key={i}>&nbsp;</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </s.CommTable>
    );
};

export default CommunityTable;
