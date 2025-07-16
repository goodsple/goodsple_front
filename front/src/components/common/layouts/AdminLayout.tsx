import { Outlet } from "react-router-dom";
import AdminHeader from "../header/AdminHeader";
import { MainContent } from "../header/AdminHeaderStyle";


function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
}

export default AdminLayout;