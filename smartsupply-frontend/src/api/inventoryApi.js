import axios from 'axios';

const API_BASE = '/api/v1';

export const getToken = async (username, password) => {
  const response = await axios.post(`${API_BASE}/auth/token`, {
    username,
    password
  });
  return response.data.token;
};

export const getProducts = async (token, page = 0, size = 20) => {
  const response = await axios.get(`${API_BASE}/products`, {
    params: { page, size },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getProductsBySupplier = async (token, supplier) => {
  const response = await axios.get(`${API_BASE}/products/supplier/${supplier}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAllProductsForStats = async (token) => {
  const response = await axios.get(`${API_BASE}/products`, {
    params: { page: 0, size: 500 },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};