import apiClient from '@/lib/api/api-axios';
import { User, Role, AuthUser } from '@/types/user.types';

export const UserService = {
  getUsers: async (): Promise<User[]> => apiClient.get('/users').then(res => res.data),

  getUserById: async (id: number): Promise<User> =>
    apiClient.get(`/users/${id}`).then(res => res.data),

  getUserByUsername: async (username: string): Promise<User> =>
    apiClient.get(`/users/${username}`).then(res => res.data),

  createUser: async (data: { name: string; email: string, username: string, password: string, roles: Role[] }): Promise<User> =>
    apiClient.post('/users', data).then(res => res.data),

  authenticate: async (data: { username: string; password: string }): Promise<AuthUser> =>
    apiClient.post('/users/authenticate ', data).then(res => res.data)
};