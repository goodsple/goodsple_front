
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import KakaoCallback from './features/auth/components/KakaoCallback.tsx';
import { AuthProvider } from './features/auth/contexts/AuthContext.tsx';

// 레이아웃(사용자,관리자)
import AdminLayout from './components/common/layouts/AdminLayout.tsx';
import Layout from "./components/common/layouts/Layout.tsx";

// 사용자화면 컴포넌트 
import Error from './components/common/error/Error';
import LiveAuctionPage from './features/auction/pages/LiveAuctionPage.tsx';
import FindId from './features/auth/components/FindId';
import FindPassword from './features/auth/components/FindPassword';
import KakaoInfo from './features/auth/components/KakaoInfo';
import Login from './features/auth/components/Login';
import SignUp from './features/auth/components/SignUp';
import BadgeGuide from './features/badge/components/BadgeGuide.tsx';
import EditProfile from './features/mypage/components/EditProfile';
import MyPage from './features/mypage/components/Mypage';
import MyReview from './features/review/components/MyReview';
import WriteReview from './features/review/components/WriteReview.tsx';
import UserMain from "./features/usermain/pages/UserMain.tsx";
import ThirdCategory from "./features/category/pages/ThirdCategory.tsx";
import Notification from './features/notification/pages/Notification.tsx';
import CategorySelect from './features/category/pages/CategorySelect.tsx';
import EventZoneMain from './features/eventzone/pages/EventZoneMain.tsx';

// 관리자화면 컴포넌트
import BookmarkPage from './features/bookmark/components/BookmarkPage.tsx';
import AdminMain from './pages/AdminMain.tsx';

function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        {/* Layout이 적용되는 페이지 */}
        <Route element={<Layout />}>
        <Route path="/kakao/callback" element={<KakaoCallback />} />
          <Route index element={<UserMain/>} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/editprofile' element={<EditProfile/>}/>
          <Route path='/writereview' element={<WriteReview/>}/>
          <Route path='/reviews' element={<MyReview/>}/>
          <Route path='/badgeguide' element={<BadgeGuide/>} />
          <Route path='/bookmarkPage' element={<BookmarkPage />} />
          <Route path='/auction/live/:auctionId' element={<LiveAuctionPage />} />
          <Route path='/categories' element={<CategorySelect />} />
          <Route path='/category' element={<ThirdCategory />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/eventZone' element={<EventZoneMain />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminMain/>} />
        </Route>

        {/* Layout 없이 단독 페이지 */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signup/kakao' element={<KakaoInfo/>}/>
        <Route path='/findid' element={<FindId/>}/>
        <Route path='/findpwd' element={<FindPassword/>}/>

        {/* 에러 페이지 */}
        <Route path='*' element={<Error/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;
