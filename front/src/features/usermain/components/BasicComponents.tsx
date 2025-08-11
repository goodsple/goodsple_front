import CateButtons from './CateButtons';
import CommMegaPhoneBox from './CommMegaPhoneBox';
import SearchBox from './SearchBox';
import CSS from './UserMainComponents.module.css';

function BasicComponents() {

  // const [keywordsList, setKeywordsList] = useState(false);

  // const onClickKeywords = () => {
  //   setKeywordsList(!keywordsList);
  // };

  return (<>
    <div className={CSS.basicComponent}>

      <SearchBox /> {/* 검색 박스 */}
      <CateButtons /> {/* 카테고리 검색 박스 */}
      <CommMegaPhoneBox /> {/* 커뮤니티 => 확성기 사용 박스 */}

      {/* <div className={CSS.searchWrap}>
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

      <div className={CSS.buttonWrap}>
        <button className={CSS.cateButton}>K-POP</button>
        <button className={CSS.cateButton}>애니메이션</button>
        <button className={CSS.cateButton}>영화/드라마</button>
        <button className={CSS.cateButton}>게임</button>
      </div>

      <div className={CSS.megaPhoneWrap}>
        <img className={CSS.megaIcon} src={megaPhone}/>
        <p>
          K-POP 채팅방  =&gt; 엑소 포카 교환할 사람 구함!!!! 난 백현 포카 나옴~~~
        </p>
        <button className={CSS.megaButton}>참여하기</button>
      </div> */}
    </div>
  </>);
}

export default BasicComponents;