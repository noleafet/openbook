import apiClient from '@/lib/api/api-axios';

import { User, AuthUser } from '@/types/user.types';
import { BaseHttpService } from '@/services/service';

export class UserService extends BaseHttpService<User> {

  constructor() {
    super('users');
  }

  async authenticate(data: { username: string; password: string }): Promise<AuthUser> {
    return apiClient.post(`/${this.resource}/authenticate`, data).then(res => res.data);
  }

}