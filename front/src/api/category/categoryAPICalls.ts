import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance.ts';
import axios from 'axios';

interface secCateProps {
  cateName: string;
  firstCateId: bigint;
}

export const createSecCategory = createAsyncThunk(
  'category/createSecCat',
  async (categoryData: {cateName: string, firstCateId: number}) => {
    const response = await axios.post(
      // '/admin/category/second',
      'http://localhost:8080/api/admin/category/second',
      categoryData
    );
    return response.data;
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

export const createThiCategory = createAsyncThunk(
  'category/createThiCate',
  async (categoryData: {cateName: string, secondCateId: number, subText: string}) => {
    const response = await axios.post(
      'http://localhost:8080/api/admin/category/third',
      categoryData
    );
    return response.data;
  }
);

export const fetchThiCate = createAsyncThunk(
  'category/fetchThiCate',
  async (secondCateId: number) => {
    const response = await axios.get(
      `http://localhost:8080/api/admin/category/third/${secondCateId}`,
    );
    return response.data;
  }
);

