
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './features/auth/contexts/AuthContext.tsx';
import './App.css';
import KakaoCallback from './features/auth/components/KakaoCallback.tsx';

// 레이아웃(사용자,관리자)
import Layout from "./components/common/layouts/Layout.tsx";
import AdminLayout from './components/common/layouts/AdminLayout.tsx';

// 사용자화면 컴포넌트 
import Error from './components/common/error/Error';
import FindId from './features/auth/components/FindId';
import FindPassword from './features/auth/components/FindPassword';
import KakaoInfo from './features/auth/components/KakaoInfo';
import Login from './features/auth/components/Login';
import SignUp from './features/auth/components/SignUp';
import EditProfile from './features/mypage/components/EditProfile';
import WriteReview from './features/review/components/WriteReview.tsx';
import MyPage from './features/mypage/components/Mypage';
import MyReview from './features/review/components/MyReview';
import UserMain from "./pages/UserMain.tsx";

// 관리자화면 컴포넌트
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
