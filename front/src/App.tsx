
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/auth/components/Login';
import SignUp from './features/auth/components/SignUp';
import FindId from './features/auth/components/FindId';
import FindPassword from './features/auth/components/FindPassword';
import EditProfile from './features/mypage/components/EditProfile';
import Layout from './components/layout/Layout';


function App() {

  return (

    <BrowserRouter>
      <Routes>
        {/* Layout이 적용되는 페이지 */}
        <Route element={<Layout />}>
          <Route path='/editprofile' element={<EditProfile/>}/>
        </Route>

        {/* Layout 없이 단독 페이지 */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/findid' element={<FindId/>}/>
        <Route path='/findpwd' element={<FindPassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
