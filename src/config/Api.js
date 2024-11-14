import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";


const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; 
  }
};


const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data; 
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; 
  }
};


const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data; 
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; 
  }
};


const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
