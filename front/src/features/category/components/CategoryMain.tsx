import CSS from './userCategory.module.css';
// import newjeans from '../../../assets/cateImages/newjeans.jpg';
import BasicComponents from '../../usermain/components/BasicComponents.tsx';
// import PopularPosts from './PopularPosts.tsx';
import CategoryBoard from './CategoryBoard.tsx';
import CategorySelect from '../pages/CategorySelect.tsx';
import { useParams } from 'react-router-dom';

function CategoryMain() {
  const { firstCateId } = useParams<{ firstCateId: string }>();
  const firstIdNum = Number(firstCateId);

  return (
    <>
      <BasicComponents />
      <div className={CSS.popularContainer}>
        <div className={CSS.categoryMain}>
          <CategorySelect firstCateId={firstIdNum} />
          {/* <PopularPosts /> */}
        </div>
      </div>
      {/* 글 목록 */}
      <CategoryBoard firstCateId={firstIdNum} />
    </>
  );
}

export default CategoryMain;