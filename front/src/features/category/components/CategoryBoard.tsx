
// import * as S from '../components/CategoryBoard.styles';
// import { useNavigate } from 'react-router-dom';
// import {  useState } from 'react';
// import dayjs from 'dayjs';
// import Pagination from '../../../components/common/pagination/Pagination';

// interface PostListDto {
//   exchangePostId: number;
//   writer: string;
//   writerNickname: string;
//   exchangePostCreatedAt: string; // ISO 문자열
//   postTradeStatus: string;
//   exchangePostTitle: string;
//   thumbnailUrl?: string;
// }

// interface CategoryBoardProps {
//   firstCateId?: number;
//   posts: PostListDto[];
// }

// function CategoryBoard({ posts }: CategoryBoardProps) {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);

//   const postsPerPage = 10;
//   const totalPages = Math.ceil(posts.length / postsPerPage);

//   // 페이지별 게시글
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   // 거래상태 한글 변환
//   const getStatusLabel = (status: string) => {
//     switch (status) {
//       case 'AVAILABLE': return '거래가능';
//       case 'ONGOING': return '거래중';
//       case 'COMPLETED': return '거래완료';
//       default: return status;
//     }
//   };

//   // 글 클릭
//   const handlePostClick = (id: number) => {
//     navigate(`/exchange/detail/${id}`);
//   };

//   // 글 작성
//   const handleWriteClick = () => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       alert('로그인이 필요합니다.');
//       navigate('/login');
//       return;
//     }
//     navigate('/exchange/new');
//   };

//   return (
//     <S.BoardWrapper>
//       <S.BoardSearchWrap>
//         <S.WriteButton onClick={handleWriteClick}>글 작성</S.WriteButton>
//       </S.BoardSearchWrap>

//       <S.CateTable>
//         <S.TableHead>
//           <S.TableRow>
//             <S.TableHeader>글번호</S.TableHeader>
//             <S.TableHeader>작성자</S.TableHeader>
//             <S.TableHeader>작성일</S.TableHeader>
//             <S.TableHeader>거래상태</S.TableHeader>
//             <S.TableHeader>제목</S.TableHeader>
//             <S.TableHeader></S.TableHeader>
//           </S.TableRow>
//         </S.TableHead>
//         <tbody>
//           {currentPosts.length > 0 ? (
//             currentPosts.map(post => (
//               <S.TableRow
//                 key={post.exchangePostId}
//                 onClick={() => handlePostClick(post.exchangePostId)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <S.TableData>{post.exchangePostId}</S.TableData>
//                 <S.TableData>{post.writerNickname}</S.TableData>
//                 <S.TableData>{dayjs(post.exchangePostCreatedAt).format('YY.MM.DD')}</S.TableData>
//                 <S.TableData>{getStatusLabel(post.postTradeStatus)}</S.TableData>
//                 <S.TableData>{post.exchangePostTitle}</S.TableData>
//                 <S.TableData>아이콘</S.TableData>
//               </S.TableRow>
//             ))
//           ) : (
//             <S.EmptyRow>
//               <S.TableData colSpan={6}>글이 없습니다.</S.TableData>
//             </S.EmptyRow>
//           )}
//         </tbody>
//       </S.CateTable>

//       {totalPages > 1 && (
//         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//       )}
//     </S.BoardWrapper>
//   );
// }

// export default CategoryBoard;




import * as S from '../components/CategoryBoard.styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface PostListDto {
  exchangePostId: number;
  writerNickname: string;
  exchangePostCreatedAt: string;
  postTradeStatus: string;
  exchangePostTitle: string;
  thumbnailUrl?: string;
}

interface CategoryBoardProps {
  posts: PostListDto[];
}

function CategoryBoard({ posts }: CategoryBoardProps) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(12);

  const visiblePosts = posts.slice(0, visibleCount);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return '거래가능';
      case 'ONGOING': return '거래중';
      case 'COMPLETED': return '거래완료';
      default: return status;
    }
  };

  return (
    <S.BoardWrapper>
      <S.BoardSearchWrap>
        <S.WriteButton onClick={() => navigate('/exchange/new')}>
          글 작성
        </S.WriteButton>
      </S.BoardSearchWrap>

      <S.CardGrid>
        {visiblePosts.map(post => (
          <S.Card
            key={post.exchangePostId}
            onClick={() => navigate(`/exchange/detail/${post.exchangePostId}`)}
          >
            <S.Thumbnail
              src={post.thumbnailUrl || '/images/no-image.png'}
              alt="thumbnail"
            />

            <S.CardBody>
              <S.Title>{post.exchangePostTitle}</S.Title>

              <S.MetaRow>
                <S.StatusBadge status={post.postTradeStatus}>
                  {getStatusLabel(post.postTradeStatus)}
                </S.StatusBadge>
              </S.MetaRow>

              <S.SubInfo>
                {post.writerNickname} · {dayjs(post.exchangePostCreatedAt).fromNow()}
              </S.SubInfo>
            </S.CardBody>
          </S.Card>
        ))}
      </S.CardGrid>

      {visibleCount < posts.length && (
        <S.MoreButton onClick={() => setVisibleCount(v => v + 12)}>
          더보기
        </S.MoreButton>
      )}
    </S.BoardWrapper>
  );
}

export default CategoryBoard;


