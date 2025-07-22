import CSS from './userCategory.module.css';
import search from '../../assets/images/search.png';

function CategoryBoard()
{
  return (
    <div className={CSS.cateBoard}>
      <div className={CSS.boardSearchWrap}>
        <input className={CSS.boardSearchInput} type={'text'} placeholder={'검색어 입력'}/>
        <button className={CSS.searchButton}>
          <img src={search}/>
        </button>
        <button className={CSS.writeButton}>
          글 작성
        </button>
      </div>
      <div>

      </div>
    </div>
  )
}

export default CategoryBoard;