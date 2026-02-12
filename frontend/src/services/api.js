import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecommendations = async (mood) => {
  try {
    const response = await API.post('/recommend', { mood });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getHistory = async () => {
  try {
    const response = await API.get('/history');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToFavourites = async (movieData) => {
  try {
    const response = await API.post('/favourites', movieData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavourites = async () => {
  try {
    const response = await API.get('/favourites');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default API;