export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  roles: Role[];
}

export interface AuthUser {
  token: string;
  user: User;
}
