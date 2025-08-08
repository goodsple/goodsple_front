import * as S from '../../admin/auth/components/UserTableStyle.ts';

function AdminCategoryTable() {

  return (
    <S.Table>
      <thead>
      <tr>
        <th>번호</th>
        <th>1차</th>
        <th>2차</th>
        <th>3차</th>
        <th>노출여부</th>
        <th>등록자</th>
        <th>관리</th>
      </tr>
      </thead>
    </S.Table>
  );

}

export default AdminCategoryTable;