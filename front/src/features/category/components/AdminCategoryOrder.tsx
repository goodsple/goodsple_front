import * as S from '../../admin/auth/components/SearchControlsStyle.ts';

function AdminCategoryOrder() {
  return (<S.Form>
      <S.Row>
        <S.Group2>
          <label>
            <input type={'checkbox'} value={'all'} />
            전체보기
          </label>
          <label>
            <input type={'checkbox'} value={'name'} />
            이름 순으로 정렬
          </label>
          <label>
            <input type={'checkbox'} value={'cate'} />
            카테고리 순으로 정렬
          </label>
        </S.Group2>
      </S.Row>
    </S.Form>);
}

export default AdminCategoryOrder;