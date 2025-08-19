import AdminCategoryTable from '../components/AdminCategoryTable.tsx';
import AdminCategoryOrder from '../components/AdminCategoryOrder.tsx';
import AdminCategorySearch from '../components/AdminCategorySearch.tsx';
import CSS from './AdminCategoryPage.module.css'

function AdminCategoryPage()
{
  return(
    <>
      <div className={CSS.adminCatePage}>
      <AdminCategoryOrder/>
      <AdminCategorySearch/>
      </div>
      <AdminCategoryTable/>
    </>
  )
}

export default AdminCategoryPage;