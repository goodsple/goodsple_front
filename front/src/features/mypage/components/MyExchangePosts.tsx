import React, { useState } from 'react';
import * as S from './MyExchangePosts.styles';
import dropdownArrow from '../../../assets/images/dropdownArrow.png';
import sampleImage1 from '../../../assets/images/sample1.png';
import sampleImage2 from '../../../assets/images/sample2.png';
import sampleImage3 from '../../../assets/images/sample3.png';

const statusOptions = ['거래가능', '거래중', '거래완료'];
const FILTERS = ['전체', ...statusOptions] as const;
type FilterType = typeof FILTERS[number];

const MyExchangePosts = () => {
    const [activeTab, setActiveTab] = useState<'myPosts' | 'history'>('myPosts');
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>('전체');

    const [data, setData] = useState([
        {
            id: 1,
            imageUrl: sampleImage1,
            title: '포토카드 A',
            status: '거래중',
            method: '직거래, 택배거래',
            likedCount: 12,
            updatedAt: '2025.07.30 14:45',
        },
        {
            id: 2,
            imageUrl: sampleImage2,
            title: '테스트글입니다 클릭금지인데 글자수가 어디까지 갈까나요 과연 와우 40자다',
            status: '거래가능',
            method: '택배거래',
            likedCount: 5,
            updatedAt: '2025.07.25 11:30',
        },
        {
            id: 3,
            imageUrl: sampleImage3,
            title: '테스트글입니다 포카4번',
            status: '거래가능',
            method: '택배거래',
            likedCount: 5,
            updatedAt: '2025.07.25 11:30',
        },
    ]);

    const toggleDropdown = (id: number) => {
        setOpenDropdownId(prev => (prev === id ? null : id));
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        setData(prev =>
            prev.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
        setOpenDropdownId(null);
    };

    const handleFilterClick = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    const filteredData =
        activeFilter === '전체' ? data : data.filter(d => d.status === activeFilter);

    return (
        <S.Container>
            <S.TabFilterWrapper>
                <S.TabWrapper>
                    <S.Tab $active={activeTab === 'myPosts'} onClick={() => setActiveTab('myPosts')}>
                        내 거래글
                    </S.Tab>
                    <S.Tab $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                        거래내역
                    </S.Tab>
                </S.TabWrapper>

                <S.FilterGroup>
                    {FILTERS.map(filter => (
                        <S.FilterButton
                            key={filter}
                            $active={filter === activeFilter}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter}
                        </S.FilterButton>
                    ))}
                </S.FilterGroup>
            </S.TabFilterWrapper>

            <S.Table>
                <thead>
                    <tr>
                        <th>사진</th>
                        <th>상품명</th>
                        <th>거래상태</th>
                        <th>거래방식</th>
                        <th>즐겨찾기</th>
                        <th>최근 수정일</th>
                        {activeTab === 'myPosts' && <th>관리</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.id}>
                            <td><S.Thumbnail src={item.imageUrl} alt="상품 이미지" /></td>
                            <td>{item.title}</td>
                            <td>
                                <S.StatusDropdownWrapper>
                                    <S.StatusButton onClick={() => toggleDropdown(item.id)} selected={item.status}>
                                        {item.status}
                                        <S.DropdownIcon src={dropdownArrow} alt="드롭다운 화살표" />
                                    </S.StatusButton>
                                    {openDropdownId === item.id && (
                                        <S.StatusOptions>
                                            {statusOptions.map(option => (
                                                <S.StatusOption
                                                    key={option}
                                                    selected={option === item.status}
                                                    onClick={() => handleStatusChange(item.id, option)}
                                                >
                                                    {option}
                                                </S.StatusOption>
                                            ))}
                                        </S.StatusOptions>
                                    )}
                                </S.StatusDropdownWrapper>
                            </td>
                            <td>{item.method}</td>
                            <td>{item.likedCount}</td>
                            <td>{item.updatedAt}</td>
                            {activeTab === 'myPosts' && (
                                <td>
                                    <S.ManageButton>수정</S.ManageButton>
                                    <S.ManageButton>삭제</S.ManageButton>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </S.Table>
        </S.Container>
    );
};

export default MyExchangePosts;
