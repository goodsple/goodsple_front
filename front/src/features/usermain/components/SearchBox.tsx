import { useState } from 'react';
import map from '../../../assets/images/map.png';
import search from '../../../assets/images/search.png';
import PopularKeywords from './PopularKeywords.tsx';
import CSS from './UserMainComponents.module.css';

const SearchBox:React.FC = () => {

    const [keywordsList, setKeywordsList] = useState(false);
    
    const onClickKeywords = () => {
        setKeywordsList(!keywordsList);
    };

    return (
        <div className={CSS.searchWrap}>
            <img src={map} className={CSS.searchIcon} />
            <div className={CSS.searchInputWrap}>
                <input className={CSS.searchInput}
                        placeholder={'굿즈 이름 또는 키워드를 검색해보세요'} />
                <img src={search} className={CSS.searchIcon2} />
            </div>
            <div className={CSS.popularKeywords} onClick={onClickKeywords}>
                <PopularKeywords state={keywordsList}/>
            <p className={CSS.realTimePopularKeywords1}>🔥실시간 인기</p>
            <p className={CSS.realTimePopularKeywords2}>1. 방탄 뷔 포카</p>
            </div>
        </div>
    )   
}

export default SearchBox;