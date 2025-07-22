import CSS from './userCategory.module.css';

function CategoryBoard()
{
  return (
    <div className={CSS.cateBoard}>
      <div className={CSS.boardSearchWrap}>
        <input type={'text'} placeholder={'검색어 입력'}/>
      </div>
    </div>
  )
}

export default CategoryBoard;