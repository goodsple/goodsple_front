import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance.ts';
import axios from 'axios';

interface secCateProps {
  cateName: string;
  firstCateId: bigint;
}

// 기존
// export const createSecCategory = createAsyncThunk(
//   'category/createSecCat',
//   async (categoryData: {cateName: string, firstCateId: number}) => {
//     const response = await axios.post(
//       // '/admin/category/second',
//       'http://localhost:8080/api/admin/category/second',
//       categoryData
//     );
//     return response.data;
//   }
// );

export const createSecCategory = createAsyncThunk(
  'category/createSecCat',
  async (categoryData: { cateName: string; firstCateId: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        'http://localhost:8080/api/admin/category/second',
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchSecCate = createAsyncThunk(
  'category/fetchSecCate',
  async (firstCateId: number) => {
    const response = await axios.get(
      `http://localhost:8080/api/admin/category/second/${firstCateId}`,
      // `/admin/category/second/${firstCateId}`,
      );
    return response.data;
  }
);

export const fetchAllSecCate = createAsyncThunk(
  'category/fetchAllSecCate',
  async () => {
    const response = await axios.get(
      `http://localhost:8080/api/admin/category/second/all`,
    );
    return response.data;
  }
);


// 파일 업로드용-1
// export const createThiCategory = createAsyncThunk(
//   'category/createThiCate',
//   async (formData: FormData) => {
//     const token = localStorage.getItem('accessToken'); // 토큰 가져오기
//     const response = await axios.post(
//       '/api/admin/category/third',
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data', // 파일 업로드 필수
//         },
//       }
//     );
//     return response.data;
//   }
// );

// 파일 미업로드용 -2
export const createThiCategory = createAsyncThunk(
  'category/createThiCategory',
  async (categoryData: { secondCateId: number; cateName: string; subText: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post('/api/admin/category/third', categoryData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);


// 기존
// export const createThiCategory = createAsyncThunk(
//   'category/createThiCate',
//   async (categoryData: {cateName: string, secondCateId: number, subText: string}) => {
//     const response = await axios.post(
//       'http://localhost:8080/api/admin/category/third',
//       categoryData
//     );
//     return response.data;
//   }
// );

export const fetchThiCate = createAsyncThunk(
  'category/fetchThiCate',
  async (secondCateId: number) => {
    const response = await axios.get(
      `http://localhost:8080/api/admin/category/third/${secondCateId}`,
    );
    return response.data;
  }
);

export const fetchAllThiCate = createAsyncThunk(
  'category/fetchAllThiCate',
  async () => {
    const response = await axios.get(
      `http://localhost:8080/api/admin/category/third/all`,
    );
    return response.data;
  }
);
