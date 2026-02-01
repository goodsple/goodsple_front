import Header from '../header/Header.tsx';
import Footer from '../footer/footer.tsx';
import { Outlet } from 'react-router-dom';
import CSS from './Layout.module.css';

function Layout() {
  return (
    <div className={CSS.layout}>
      <Header />
      <div className={CSS.outlet}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
