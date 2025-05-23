// src/services/api.js - இந்த file-ஐ create பண்ணுங்க
import config from '../config.js';

const API_BASE_URL = config.API_BASE_URL;

// API functions - இதுல உங்க backend routes-க்கு ஏத்த மாதிரி மாத்துங்க
export const apiService = {
  // எல்லா food items-ஐ get பண்ண
  getFoodItems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/foods`);
      if (!response.ok) throw new Error('Food items fetch பண்ண முடியல');
      return await response.json();
    } catch (error) {
      console.error('Food items fetch error:', error);
      throw error;
    }
  },

  // Order place பண்ண
  placeOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Order place பண்ண முடியல');
      return await response.json();
    } catch (error) {
      console.error('Order place error:', error);
      throw error;
    }
  },

  // User login
  loginUser: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) throw new Error('Login failed');
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // User register
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Registration failed');
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
};