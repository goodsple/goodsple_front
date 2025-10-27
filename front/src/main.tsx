import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store/Store.ts';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>  개발모드에서 이펙트 중복 호출 문제로 주석 처리, 기능 동작에는 문제 없음
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>,
)
