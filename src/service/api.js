import axios from "axios";

const API_BASE_URL = "http://localhost:9091";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

export const login = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email:"aaaa@gmail.com",
        password:"123456"
      });
      if(response){
        console.log(response.data)
        return response.data;
      }
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  };