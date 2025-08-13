import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

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
  }
});

export const {
  postSecCate,
  putSecCate,
  deleteSecCate,
  getSecCate
} = categorySlice.actions;

export default categorySlice.reducer;