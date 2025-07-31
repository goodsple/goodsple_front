import { Outlet } from "react-router-dom";
import AdminHeader from "../header/AdminHeader";
import { MainContent } from "../header/AdminHeaderStyle";
import AdminNav from "../nav/AdminNav";
import Layout from "./Layout";
import { LayoutContainer } from "./AdminLayout.styles";


function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <LayoutContainer>
        <AdminNav />
        <MainContent>
          <Outlet />
        </MainContent>
      </LayoutContainer>
    </>
  );
}

export default AdminLayout;