import { createSlice } from '@reduxjs/toolkit';
import {
  createSecCategory,
  fetchAllSecCate,
  fetchAllThiCate,
  fetchSecCate,
} from '../../api/category/categoryAPICalls.ts';

const initialState = {
  firstCate: [],
  secondCate: [],
  thirdCate: [],
  allSecCate: [],
  allThiCate: [],
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
        state.secondCate = action.payload;
      })
      .addCase(fetchSecCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllSecCate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSecCate.fulfilled, (state, action) => {
        state.allSecCate = action.payload;
      })
      .addCase(fetchAllSecCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllThiCate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllThiCate.fulfilled, (state, action) => {
        state.allThiCate = action.payload;
      })
      .addCase(fetchAllThiCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const {
  postSecCate,
  putSecCate,
  deleteSecCate,
  getSecCate,
  postThiCate,
  putThiCate,
  deleteThiCate,
  getThiCate,
} = categorySlice.actions;

export default categorySlice.reducer;