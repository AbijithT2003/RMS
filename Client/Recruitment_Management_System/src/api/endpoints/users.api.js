import { apiClient } from '../client';

export const usersApi = {
  // Admin functionality
  createUser: async (createUserRequest) => {
    // CreateUserRequest: { email, fullName, password, phone?, role }
    const res = await apiClient.post('/users', createUserRequest);
    return res.data?.data || res.data; // Returns UserResponse
  },
  
  getUserByValue: async (value) => {
    // value can be UUID or email
    const res = await apiClient.get(`/users/${value}`);
    return res.data?.data || res.data; // Returns UserResponse
  },
  
  getAllUsers: async () => {
    const res = await apiClient.get('/users');
    return res.data?.data || res.data; // Returns List<UserResponse>
  }
};