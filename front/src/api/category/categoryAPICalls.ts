import axios from 'axios';

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