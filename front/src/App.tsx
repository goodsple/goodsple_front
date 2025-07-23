
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

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
import UserMain from "./pages/UserMain.tsx";

// 관리자화면 컴포넌트
import axiosInstance from './api/axiosInstance.ts';
import AdminMain from './pages/AdminMain.tsx';


// useNavigate, useLocation은 BrowserRouter 안에서만 쓸 수 있기 때문에 AppRoutes와 App으로 나눔
// 라우터 훅과 useEffect 사용을 위해 AppRoutes로 분리

function AppRoutes() {
  // 페이지 라우팅,  카카오 로그인 인가 코드 감지
  
  const navigate = useNavigate();  // 페이지 이동할 때 사용
  const location = useLocation();  // 현재 url에서 code 확인할 때 사용

  useEffect(()=>{
    // 카카오 인가 코드 감지
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if(code){
      // axios 요청
      ( async()=>{
        try{
          const res = await axiosInstance.get(`/auth/kakao/callback?code=${code}`)
          const {isNewUser,accessToken,refreshToken, ...userInfo} = res.data;

          if(isNewUser) {
            navigate("/signup/kakao", { state: userInfo });
          }else {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/");
          }
        }catch(err){
          console.error("카카오 로그인 처리 오류:", err);
          navigate("/login");
        }
      })();
    }
  }, [location.search, navigate]);

  return (
    <Routes>
      {/* Layout이 적용되는 페이지 */}
      <Route element={<Layout />}>
        <Route index element={<UserMain/>} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/editprofile' element={<EditProfile/>}/>
        <Route path='/writereview' element={<WriteReview/>}/>
        <Route path='/reviews' element={<MyReview/>}/>
        <Route path='/badgeguide' element={<BadgeGuide/>} />

        <Route path='/auction/live/:auctionId' element={<LiveAuctionPage />} />
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
      <Route path='*' element={<Error/>}/>
    </Routes>
  )
}

function App() {
  return(
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
};

export default App;
