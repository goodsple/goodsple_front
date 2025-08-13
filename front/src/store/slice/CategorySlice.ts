import { createSlice } from '@reduxjs/toolkit';
import { createSecCategory, fetchSecCate } from '../../api/category/categoryAPICalls.ts';

const initialState = {
  firstCate: [],
  secondCate: [],
  thirdCate: [],
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name:'category',
  initialState,
  reducers: {
    postSecCate: (state, action) => {
      return action.payload;
    },
    putSecCate: (state, action) => {
      return action.payload;
    },
    deleteSecCate: (state, action) => {
      return action.payload;
    },
    getSecCate: (state, action) => {
      return action.payload;
    },
    postThiCate: (state, action) => {
      return action.payload;
    },
    putThiCate: (state, action) => {
      return action.payload;
    },
    deleteThiCate: (state, action) => {
      return action.payload;
    },
    getThiCate: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSecCate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecCate.fulfilled, (state, action) => {
        console.log('🔍 extraReducers에서 받은 데이터:', action.payload);
        console.log('🔍 데이터 타입:', typeof action.payload);
        console.log('🔍 Array.isArray:', Array.isArray(action.payload));

        state.secondCate = action.payload; // 이 부분이 문제일 수 있음
      })
      .addCase(fetchSecCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  postSecCate,
  putSecCate,
  deleteSecCate,
  getSecCate
} = categorySlice.actions;

export default categorySlice.reducer;