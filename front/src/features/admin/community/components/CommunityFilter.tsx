// Components/CommunityFilter.tsx
import React from 'react';
import * as s from './CommunityFilterStyle';

interface FilterProps {
    searchRoomId: string;
    setSearchRoomId: (value: string) => void;
    startDate: string;
    setStartDate: (value: string) => void;
    endDate: string;
    setEndDate: (value: string) => void;
}

const CommunityFilter: React.FC<FilterProps> = ({
        searchRoomId,
        setSearchRoomId,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    }) => {
        return (
            <s.FilterWrapper>
                <s.FilterItem>
                    <label htmlFor="roomId">채팅방 ID</label>
                    <select
                    id="roomId"
                    value={searchRoomId}
                    onChange={(e) => setSearchRoomId(e.target.value)}
                    >
                        <option value="">전체</option>
                        <option value="K-POP">K-POP</option>
                        <option value="MOVIE">MOVIE</option>
                        <option value="GAME">GAME</option>
                        <option value="ANIMATION">ANIMATION</option>
                        <option value="SPORTS">SPORTS</option>
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
