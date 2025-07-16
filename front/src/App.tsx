
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/common/layouts/Layout.tsx";
import UserMain from "./pages/UserMain.tsx";
// import Header from './components/common/header/Header';  -- header 컴포넌트 추후 연결

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<UserMain/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
    // <Header />
  )
}

export default App;
