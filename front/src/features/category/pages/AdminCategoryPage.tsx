import AdminCategoryOrder from '../components/AdminCategoryOrder.tsx';
import AdminCategorySearch from '../components/AdminCategorySearch.tsx';
import CSS from './AdminCategoryPage.module.css'
import AdminCategoryTree from '../components/AdminCategoryTree.tsx';

function AdminCategoryPage()
{
  return(
    <>
      <div className={CSS.adminCatePage}>
      <AdminCategoryOrder/>
      <AdminCategorySearch/>
      </div>
      {/* <AdminCategoryTable/> */}
      <AdminCategoryTree/>
    </>
  )
}

export default AdminCategoryPage;