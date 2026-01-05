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
      
    </div>
  </>);
}

export default BasicComponents;