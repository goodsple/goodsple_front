
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
import MapViewPage from './features/map/pages/MapViewPage';
import MyBidsPage from './features/mybids/pages/MyBidsPage';
import EditProfile from './features/mypage/components/EditProfile';
import MyPage from './features/mypage/components/Mypage';
import PaymentFailurePage from './features/payment/pages/PaymentFailurePage';
import PaymentPage from './features/payment/pages/PaymentPage';
import PaymentSuccessPage from './features/payment/pages/PaymentSuccessPage';
import MyReview from './features/review/components/MyReview';
import WriteReview from './features/review/components/WriteReview.tsx';
import NoticeList from './features/notice/NoticeList.tsx';
import UserMain from "./pages/UserMain.tsx";

// 관리자화면 컴포넌트
import AdminAuctionCreatePage from './features/admin/pages/AdminAuctionCreatePage';
import AdminAuctionEditPage from './features/admin/pages/AdminAuctionEditPage';
import AdminAuctionPage from './features/admin/pages/AdminAuctionPage';
import AdminAuctionResultPage from './features/admin/pages/AdminAuctionResultPage';
import BookmarkPage from './features/bookmark/components/BookmarkPage.tsx';
import AdminMain from './pages/AdminMain.tsx';

import ReportWrapper from './features/report/ReportWrapper.tsx';


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
          <Route path='/mypage/bids' element={<MyBidsPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/payment/success' element={<PaymentSuccessPage />} />
          <Route path='/payment/failure' element={<PaymentFailurePage />} />
          <Route path='/map' element={<MapViewPage />} />
          <Route path='/notice' element={<NoticeList />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminMain/>} />
          <Route path='/admin/auctions' element={<AdminAuctionPage />} />
          <Route path='/admin/auctions/create' element={<AdminAuctionCreatePage />} />
          <Route path='/admin/auctions/edit/:auctionId' element={<AdminAuctionEditPage />} />
          <Route path='/admin/auctions/result/:auctionId' element={<AdminAuctionResultPage />} />
        </Route>

        {/* Layout 없이 단독 페이지 */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signup/kakao' element={<KakaoInfo/>}/>
        <Route path='/findid' element={<FindId/>}/>
        <Route path='/findpwd' element={<FindPassword/>}/>
        
        {/* 신고 들어가는 컴포넌트 준비되면 ReportWrapper 없앨 예정 test로 만듬 */}
        <Route path='/reports' element={<ReportWrapper/>}/> 

        {/* 에러 페이지 */}
        <Route path='*' element={<Error/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;
