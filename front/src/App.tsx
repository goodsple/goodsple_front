
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Error from './components/common/error/Error';
import Layout from './components/layout/Layout';
import FindId from './features/auth/components/FindId';
import FindPassword from './features/auth/components/FindPassword';
import KakaoInfo from './features/auth/components/KakaoInfo';
import Login from './features/auth/components/Login';
import SignUp from './features/auth/components/SignUp';
import EditProfile from './features/mypage/components/EditProfile';
import MyPage from './features/mypage/components/Mypage';
import MyReview from './features/review/components/MyReview';
import WriteReview from './features/review/components/WriteReview';


function App() {

  return (

    <BrowserRouter>
      <Routes>
        {/* Layout이 적용되는 페이지 */}
        <Route element={<Layout />}>
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/editprofile' element={<EditProfile/>}/>
          <Route path='/writereview' element={<WriteReview/>}/>
          <Route path='/reviews' element={<MyReview/>}/>
        </Route>

        {/* Layout 없이 단독 페이지 */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signup/kakao' element={<KakaoInfo/>}/>
        <Route path='/findid' element={<FindId/>}/>
        <Route path='/findpwd' element={<FindPassword/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
