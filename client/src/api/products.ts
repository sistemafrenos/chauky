// src/api/products.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await axios.post(API_URL, {...productData, precio: Number(productData.precio)});
  return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};