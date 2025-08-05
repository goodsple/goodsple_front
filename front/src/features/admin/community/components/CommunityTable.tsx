import type React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CommunityStat } from '../mock/CommData';
import * as s from './CommunityTableStyle';

interface Props {
    data: CommunityStat[];
}

const CommunityTable:React.FC<Props> = ({data}) => {
    const rowCount = 10;
    const emptyRows = rowCount - data.length;
    const navigate = useNavigate();

    return(
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
                        <td>{r.roomId}</td>
                        <td>{r.userCount}</td>
                        <td>{r.messageCount}</td>
                        <td>{r.lastMessage}</td>
                        <td>
                           <button
                                onClick={() =>
                                    navigate('/admin/community/detail', {
                                        state: {
                                            date: r.date,
                                            roomId: r.roomId,
                                            userCount: r.userCount,
                                            messageCount: r.messageCount,
                                        },
                                    })
                                }
                                >
                                대화 상세보기
                            </button>
                        </td>
                    </tr>
                ))}

                {Array.from({ length: emptyRows }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                         {[...Array(6)].map((_, i) => (
                            <td key={i}>&nbsp;</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </s.CommTable>
    )

}

export default CommunityTable;