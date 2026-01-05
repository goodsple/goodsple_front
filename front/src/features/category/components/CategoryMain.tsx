import CSS from './userCategory.module.css';
// import newjeans from '../../../assets/cateImages/newjeans.jpg';
import BasicComponents from '../../usermain/components/BasicComponents.tsx';
// import PopularPosts from './PopularPosts.tsx';
import CategoryBoard from './CategoryBoard.tsx';
import CategorySelect from '../pages/CategorySelect.tsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface PostListDto {
  exchangePostId: number;
  writer: string;
  writerNickname: string;
  exchangePostCreatedAt: string;
  postTradeStatus: string;
  exchangePostTitle: string;
}

function CategoryMain() {
  const { firstCateId } = useParams<{ firstCateId: string }>();
  const firstIdNum = Number(firstCateId);

  const [posts, setPosts] = useState<PostListDto[]>([]);


  // ✅ 페이지 진입 시 전체 글 불러오기
  useEffect(() => {
    if (!firstIdNum) return;
    axios
      .get(`/api/posts/by-category?categoryId=${firstIdNum}`)
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, [firstIdNum]);

  // 필터 변경 시 호출
  const handleFilterChange = (secondIds: number[], thirdIds: number[]) => {
    if (secondIds.length === 0 && thirdIds.length === 0) {
      // 전체 조회
      axios
        .get(`/api/posts/by-category?categoryId=${firstIdNum}`)
        .then(res => setPosts(res.data))
        .catch(console.error);
    } else {
      axios
        .post('/api/posts/filter', { secondIds, thirdIds })
        .then(res => setPosts(res.data))
        .catch(console.error);
    }
  };

  return (
    <>
      <BasicComponents />
      <div className={CSS.popularContainer}>
        <div className={CSS.categoryMain}>
          <CategorySelect
            firstCateId={firstIdNum}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <CategoryBoard posts={posts} />
    </>
  );
}

export default CategoryMain;