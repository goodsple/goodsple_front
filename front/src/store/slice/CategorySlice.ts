import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSecCate,
  fetchAllThiCate,
  fetchSecCate,
  createThiCategory,
} from '../../api/category/categoryAPICalls.ts';
import axios from 'axios';

export const fetchAllFirstCate = createAsyncThunk(
  'category/fetchAllFirstCate',
  async () => {
    const response = await axios.get('http://localhost:8080/api/admin/category/first/all');
    return response.data;
  }
);

interface CategoryState {
  firstCate: any[];
  secondCate: any[];
  thirdCate: any[];
  allSecCate: any[];
  allThiCate: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  firstCate: [],
  secondCate: [],
  thirdCate: [],
  allSecCate: [],
  allThiCate: [],
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    postSecCate: (state, action) => {
      state.secondCate.push(action.payload);
    },
    putSecCate: (state, action) => {
      const idx = state.secondCate.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.secondCate[idx] = action.payload;
    },
    deleteSecCate: (state, action) => {
      state.secondCate = state.secondCate.filter(c => c.id !== action.payload);
    },
    getSecCate: (state, action) => {
      state.secondCate = action.payload;
    },
    postThiCate: (state, action) => {
      state.thirdCate.push(action.payload);
    },
    putThiCate: (state, action) => {
      const idx = state.thirdCate.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.thirdCate[idx] = action.payload;
    },
    deleteThiCate: (state, action) => {
      state.thirdCate = state.thirdCate.filter(c => c.id !== action.payload);
    },
    getThiCate: (state, action) => {
      state.thirdCate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 1차 카테고리
      .addCase(fetchAllFirstCate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFirstCate.fulfilled, (state, action) => {
        state.firstCate = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllFirstCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // 2차 카테고리
      .addCase(fetchSecCate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSecCate.fulfilled, (state, action) => {
        state.secondCate = action.payload;
        state.loading = false;
      })
      .addCase(fetchSecCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchAllSecCate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSecCate.fulfilled, (state, action) => {
        state.allSecCate = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllSecCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // 3차 카테고리
      .addCase(fetchAllThiCate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllThiCate.fulfilled, (state, action) => {
        state.allThiCate = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllThiCate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createThiCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.thirdCate.push(action.payload);
        }
      });
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