import type { QueryParams, User } from '@/App.vue';
import { fetchJson, fetchGetJson } from '@/API/Client';

const USERS_ENDPOINT = '/users';

export const UserService = {
  async fetchUsers(params?: QueryParams) {
    return fetchGetJson<{
      users: User[];
      offset: number;
      limit: number;
      totalRecords: number;
      sortField: string;
    }>(USERS_ENDPOINT, params);
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
