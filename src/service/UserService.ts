import { fetchJson, fetchGetJson } from '@/API/Client';
import type { RoleValue } from '@/constants/roles';

const USERS_ENDPOINT = '/users';

export type User = {
  'id': number;
  'name': string;
  'email': string;
  'avatar': string;
  'role': RoleValue;
};
export type QueryParams = {
  offset: number;
  limit: number;
  sortField: keyof User;
  sortOrder: 'asc' | 'desc';
  filter: string;
}
type FetchUsersResponse = {
  users: User[];
  offset: number;
  limit: number;
  totalRecords: number;
  sortField: string;
};

export const UserService = {
  async fetchUsers(params?: QueryParams) {
    return fetchGetJson<FetchUsersResponse>(USERS_ENDPOINT, params);
  },

  async editUser(user: User) {
    const url = `${USERS_ENDPOINT}/${user.id}`;

    return fetchJson<User>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  },

  async editUsers(users: Partial<User>[]) {
    return fetchJson<User[]>(USERS_ENDPOINT, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    });
  },

  async deleteUsers(users: Partial<User>[]) {
    const response = await fetch(USERS_ENDPOINT, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    });

    return response.status === 204;
  },

  async deleteUser(user: Partial<User>) {
    const url = `${USERS_ENDPOINT}/${user.id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    return response.status === 204;
  },
};
