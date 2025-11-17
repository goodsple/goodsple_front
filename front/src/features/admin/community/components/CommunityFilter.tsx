import React from 'react';
import * as s from './CommunityFilterStyle';

export interface ChatRoom {
  roomId: string;
  roomName: string;
}

interface Props {
  searchRoomId: string;
  setSearchRoomId: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  chatRooms: ChatRoom[];
}

const CommunityFilter: React.FC<Props> = ({
  searchRoomId,
  setSearchRoomId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  chatRooms,
}) => {
  return (
    <s.FilterWrapper>
      <s.FilterItem>
        <label htmlFor="roomId">채팅방 ID</label>
        <select
          id="roomId"
          value={searchRoomId}
          onChange={(e) => setSearchRoomId(e.target.value.trim() || '')}
        >
          <option value="">전체</option>
          {chatRooms.map((room) => (
            <option key={room.roomId} value={room.roomId}>
              {room.roomName}
            </option>
          ))}
        </select>
      </s.FilterItem>

      <s.FilterItem style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
        <label>날짜 검색</label>
        <s.DateInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span>~</span>
        <s.DateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </s.FilterItem>
    </s.FilterWrapper>
  );
};

export default CommunityFilter;
