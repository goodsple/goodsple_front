import * as style from './PaginationStyle';
import arrowLeftImg from '../../../assets/images/arrow_left.png';
import arrowRightImg from '../../../assets/images/arrow_right.png';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageRange = 5;
  const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  // 1. 1~5페이지: 번호만
  if (totalPages <= 5) {
    return (
      <style.PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <style.PageButton
            key={i}
            onClick={() => onPageChange(i + 1)}
            active={currentPage === i + 1}
          >
            {i + 1}
          </style.PageButton>
        ))}
      </style.PaginationContainer>
    );
  }

  // 2. 6~12페이지: 화살표만, … 없음
  if (totalPages >= 6 && totalPages <= 12) {
    return (
      <style.PaginationContainer>
        {startPage > 1 && (
          <style.PageButton onClick={() => onPageChange(startPage - 1)}>
            <img src={arrowLeftImg} alt="이전" />
          </style.PageButton>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <style.PageButton
            key={i}
            onClick={() => onPageChange(startPage + i)}
            active={currentPage === startPage + i}
          >
            {startPage + i}
          </style.PageButton>
        ))}

        {endPage < totalPages && (
          <style.PageButton onClick={() => onPageChange(endPage + 1)}>
            <img src={arrowRightImg} alt="다음" />
          </style.PageButton>
        )}
      </style.PaginationContainer>
    );
  }

  // 3. 13페이지 이상: 화살표 + … 표시
  return (
    <style.PaginationContainer>
      {startPage > 1 && (
        <>
          <style.PageButton onClick={() => onPageChange(startPage - 1)}>
            <img src={arrowLeftImg} alt="이전" />
          </style.PageButton>
          <style.PageButton onClick={() => onPageChange(1)}>1</style.PageButton>
          <style.PageButton onClick={() => onPageChange(startPage - 1)}>...</style.PageButton>
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <style.PageButton
          key={i}
          onClick={() => onPageChange(startPage + i)}
          active={currentPage === startPage + i}
        >
          {startPage + i}
        </style.PageButton>
      ))}

      {endPage < totalPages && (
        <>
          <style.PageButton onClick={() => onPageChange(endPage + 1)}>...</style.PageButton>
          <style.PageButton onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </style.PageButton>
          <style.PageButton onClick={() => onPageChange(endPage + 1)}>
            <img src={arrowRightImg} alt="다음" />
          </style.PageButton>
        </>
      )}
    </style.PaginationContainer>
  );
};

export default Pagination;
