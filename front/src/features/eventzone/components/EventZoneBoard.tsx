import CSS from './eventzone.module.css';
import search from '../../../assets/images/search.png';

function EventZoneBoard() {
  return (<div className={CSS.eventZoneBoard}>
    <p className={CSS.popEventTitle}>이벤트존 글 전체보기</p>
    <div className={CSS.boardSearchWrap}>
      <input className={CSS.boardSearchInput} type={'text'} placeholder={'검색어 입력'} />
      <button className={CSS.searchButton}>
        <img src={search} />
      </button>
      <button className={CSS.writeButton}>
        글 작성
      </button>
    </div>
    <div>
      <table className={CSS.eventZoneTable}>
        <thead>
        <tr>
          <th>글번호</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>이벤트존</th>
          <th>제목</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        <tr>
          <td>123</td>
          <td>뉴진스덕후</td>
          <td>25.07.01</td>
          <td>[WARNING] HOSHI X WOOZI</td>
          <td>뉴진스 포카 모음(일괄환영) 판매내역 업데이트중</td>
          <td>아이콘</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>);
}

export default EventZoneBoard;