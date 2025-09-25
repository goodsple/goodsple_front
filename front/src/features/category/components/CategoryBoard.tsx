import * as S from '../components/CategoryBoard.styles';
import search from '../../../assets/images/search.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Pagination from '../../../components/common/pagination/Pagination';


interface PostListDto {
  exchangePostId: number;
  writer: string;
  writerNickname: string;
  exchangePostCreatedAt: string; // ISO 문자열로 받음
  postTradeStatus: string;
  exchangePostTitle: string;
  thumbnailUrl?: string; 
}


function CategoryBoard() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostListDto[]>([]);
  const { categoryId } = useParams<{ categoryId: string }>(); // URL에서 categoryId 가져오기

  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10; // 페이지당 글 개수
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // API 호출
  const fetchPosts = async () => {
    try {
      // const response = await axios.get<PostListDto[]>('/api/posts');
        const response = await axios.get<PostListDto[]>(`/api/posts/by-category?categoryId=${categoryId}`);
      setPosts(response.data);
      console.log('글 목록 조회 성공:', response.data);
    } catch (error) {
      console.error('글 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categoryId]); // categoryId가 바뀔 때마다 글 목록 다시 불러오기

  // 현재 페이지 게시글 잘라내기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 거래상태 한글 변환
  const getStatusLabel = (status: string) => {
  switch (status) {
    case 'AVAILABLE':
      return '거래가능';
    case 'ONGOING':
      return '거래중';
    case 'COMPLETED':
      return '거래완료';
    default:
      return status; // 혹시 모르는 값 fallback
  }
};


  // 글 클릭 핸들러
const handlePostClick = (id: number) => {
  navigate(`/exchange/detail/${id}`); // 로그인 여부 상관없이 상세보기 이동
};



  return (
    <S.BoardWrapper>
      <S.BoardSearchWrap>
        <S.BoardSearchInput type="text" placeholder="검색어 입력" />
        <S.SearchButton>
          <img src={search} />
        </S.SearchButton>
        <S.WriteButton onClick={() => navigate('/exchange/new')}>
          글 작성
        </S.WriteButton>
      </S.BoardSearchWrap>

      <S.CateTable>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeader>글번호</S.TableHeader>
            <S.TableHeader>작성자</S.TableHeader>
            <S.TableHeader>작성일</S.TableHeader>
            <S.TableHeader>거래상태</S.TableHeader>
            <S.TableHeader>제목</S.TableHeader>
            <S.TableHeader></S.TableHeader>
          </S.TableRow>
        </S.TableHead>
        <tbody>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <S.TableRow key={post.exchangePostId} onClick={() => handlePostClick(post.exchangePostId)} style={{ cursor: 'pointer' }}>
                <S.TableData>{post.exchangePostId}</S.TableData>
                <S.TableData>{post.writerNickname}</S.TableData>
                <S.TableData>{dayjs(post.exchangePostCreatedAt).format('YY.MM.DD')}</S.TableData>
                <S.TableData>{getStatusLabel(post.postTradeStatus)}</S.TableData>
                <S.TableData>{post.exchangePostTitle}</S.TableData>
                <S.TableData>아이콘</S.TableData>
              </S.TableRow>
            ))
          ) : (
            <S.EmptyRow>
              <S.TableData colSpan={6}>글이 없습니다.</S.TableData>
            </S.EmptyRow>
          )}
        </tbody>
      </S.CateTable>

      {/* ✅ 페이지네이션 추가 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </S.BoardWrapper>
  );
}


export default CategoryBoard;