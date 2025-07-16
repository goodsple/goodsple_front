import Header from '../header/Header.tsx';
import Footer from '../footer/footer.tsx';
import { Outlet } from 'react-router-dom';
import CSS from './Layout.module.css';

function Layout() {
  return (<>
      <Header />
      <div className={CSS.outlet}>
        <Outlet />
      </div>
      <Footer />
    </>);
}

export default Layout;