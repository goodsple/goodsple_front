import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1차 카테고리 수정(메모만)
export const updateFirstCategory = async (
  firstCateId: number,
  data: { subText?: string } // 이름은 수정 불가, subText만
) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await axios.put(
      `http://localhost:8080/api/admin/category/first/${firstCateId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.status === 200 || res.status === 204;
  } catch (err) {
    console.error('updateFirstCategory error:', err);
    return false;
  }
};

// 2차 카테고리 수정
export const updateSecCategory = async (secondCateId: number, data: { cateName: string; subText?: string; visibility?: 'public' | 'private' }) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await axios.put(`http://localhost:8080/api/admin/category/second/${secondCateId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return res.status === 200 || res.status === 204;
  } catch (err) {
    console.error('updateSecCategory error:', err);
    return false;
  }
};

export const updateThiCategory = async (thirdCateId: number, data: { cateName: string; subText?: string; visibility?: 'public' | 'private' }) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await axios.put(`http://localhost:8080/api/admin/category/third/${thirdCateId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return res.status === 200 || res.status === 204;
  } catch (err) {
    console.error('updateThiCategory error:', err);
    return false;
  }
};
export const fetchAllFirstCate = createAsyncThunk(
  'category/fetchAllFirstCate',
  async () => {
    const response = await axios.get('http://localhost:8080/api/admin/category/first/all');
    return response.data; // DB에서 받아온 FirstCate[]
  }
);

// 추가된 부분: 카테고리 추가 API
export const addCategoryAPI = async ({ parentId, level, name, subText, visibility }: { parentId: number; level: number; name: string, subText: string, visibility?: 'public' | 'private'}) => {
  const token = localStorage.getItem('accessToken');
  try {
    if (level === 2) {
      const res = await axios.post('http://localhost:8080/api/admin/category/second',
        { cateName: name, firstCateId: parentId, subText, visibility  }, // body
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      return res.data.secondCateId;
    } else if (level === 3) {
      const res = await axios.post('http://localhost:8080/api/admin/category/third',
        { cateName: name, secondCateId: parentId, subText, visibility },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      return res.data.thirdCateId;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

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
  async (categoryData: { secondCateId: number; cateName: string; subText: string, visibility: 'public' | 'private' }, { rejectWithValue }) => {
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
