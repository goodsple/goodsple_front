import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './index.js';

const Store = configureStore ({
    reducer: rootReducers,
    devTools: true, // 개발환경이면 true, 배포 시 false로 바꿔도 됨
  }
);

export default Store;