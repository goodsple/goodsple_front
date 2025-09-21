import CSS from './userCategory.module.css';
import search from '../../../assets/images/search.png';
import { useNavigate } from 'react-router-dom';

function CategoryBoard() {

  const navigate = useNavigate();



  return (<div className={CSS.cateBoard}>
    <div className={CSS.boardSearchWrap}>
      <input className={CSS.boardSearchInput} type={'text'} placeholder={'검색어 입력'} />
      <button className={CSS.searchButton}>
        <img src={search} />
      </button>
      <button className={CSS.writeButton}
        onClick={() => navigate('/exchange/new')}
        >
        글 작성
      </button>
    </div>
    <div>
      <table className={CSS.cateTable}>
        <thead>
          <tr>
            <th>글번호</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>거래상태</th>
            <th>제목</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
          <tr>
            <td>123</td>
            <td>뉴진스덕후</td>
            <td>25.07.01</td>
            <td>거래중</td>
            <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
            <td>아이콘</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>);
}

export default CategoryBoard;