import CSS from './userCategory.module.css';
// import newjeans from '../../../assets/cateImages/newjeans.jpg';
import BasicComponents from '../../usermain/components/BasicComponents.tsx';
// import PopularPosts from './PopularPosts.tsx';
import CategoryBoard from './CategoryBoard.tsx';
import CategorySelect from '../pages/CategorySelect.tsx';

function CategoryMain() {
  return (<>
    <BasicComponents />
    <div className={CSS.popularContainer}>
      <div className={CSS.categoryMain}>
        <CategorySelect />
        {/* <div className={CSS.categoryMainImg}>
        <img src={newjeans} />
        </div> */}
        {/* <p className={CSS.categoryMainFont1}>NEWJEANS</p> */}
        {/* <p className={CSS.categoryMainFont2}>인기게시글</p> */}
        {/* <PopularPosts /> */}
      </div>
    </div>

    {/* 글 목록 */}
    <CategoryBoard />
  </>
  );
}

export default CategoryMain;