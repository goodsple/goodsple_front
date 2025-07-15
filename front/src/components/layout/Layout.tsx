import { Outlet } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/footer";

function Layout(){
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
        
    )
}
export default Layout;