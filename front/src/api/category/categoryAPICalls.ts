import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance.ts';

interface secCateProps {
  cateName: string;
  firstCateId: bigint;
}

export const createCategory = createAsyncThunk(
  'category/create',
  async (categoryData: {cateName: string, firstCateId: number}) => {
    const response = await axiosInstance.post(
      '/admin/category',
      categoryData
    );
    return response.data;
  }
);

export const fetchSecCate = createAsyncThunk(
  'category/fetchSecCate',
  async (firstCateId: number) => {
    const response = await axiosInstance.get(`/admin/category/second/${firstCateId}`);
    return response.data;
  }
);
