import { combineReducers } from '@reduxjs/toolkit';
import categorySlice from './slice/CategorySlice';

const rootReducers = combineReducers(
  {
    category: categorySlice,

  }
);

export default rootReducers;