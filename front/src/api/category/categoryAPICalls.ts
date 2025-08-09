import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface secCateProps {
  cateName: string;
  firstCateId: bigint;
}

export const createSecCate = async ({cateName, firstCateId} : secCateProps) => {
  try {
    const response = await axios.post('http://localhost:8080/api/admin/category/second', {
      cateName: cateName,
      firstCateId: firstCateId,
    });
    console.log('created: ', response.data);
  } catch (error) {
    console.log('error: ', error);
  }
}

export const fetchSecCate = createAsyncThunk(
  'category/fetchSecCate',
  async (firstCateId: number) => {
    const response = await axios.get(`http://localhost:8080/api/admin/category/second/${firstCateId}`);
    return response.data;
  }
);
