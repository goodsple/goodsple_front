import React from 'react';
import * as s from './ProhibitedWordsFilterStyle';

interface Props {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    startDate: string;
    setStartDate: (value: string) => void;
    endDate: string;
    setEndDate: (value: string) => void;

    onClickAdd: () => void;
    onClickDelete: () => void;
}

const ProhibitedWordsFilter: React.FC<Props> = ({
        searchTerm,
        setSearchTerm,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        onClickAdd,
        onClickDelete
    }) => {
    return (
        <s.FilterContainer>
            <s.FilterWrapper>
                <s.FilterItem>
                    <label>금칙어 검색</label>
                    <s.Input
                        placeholder="검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </s.FilterItem>

                <s.FilterItem>
                    <label>등록 날짜</label>
                    <s.Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>~</span>
                    <s.Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </s.FilterItem>
            </s.FilterWrapper>

            <s.ButtonWrapper>
                 <s.AddButton onClick={onClickAdd}>금칙어 추가</s.AddButton>
                <s.DeleteButton onClick={onClickDelete}>금칙어 삭제</s.DeleteButton>
            </s.ButtonWrapper>
        </s.FilterContainer>
    );
};

export default ProhibitedWordsFilter;