import type { QueryParams, User } from '@/App.vue';

export const UserService = {
  getUsers(params: QueryParams) {
    const queryParams = params
      ? Object.entries(params)
        .map(([key, value]) => // eslint-disable-line
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
      : '';

    const uri = `/users?${queryParams}`;

    return fetch(uri).then((res) => res.json());
  },
  editUser(user: User) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const uri = `/users/${user.id}`;

    return fetch(uri, options).then((res) => res.json());
  },
  editUsers(users: Partial<User>[]) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    };

    const uri = `/users`;

    return fetch(uri, options).then((res) => res.json());
  },
  deleteUsers(users: Partial<User>[]) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    };

    const uri = `/users`;

    return fetch(uri, options).then((res) => res.status === 204);
  },
  deleteUser(user: Partial<User>) {
    const options = {
      method: 'DELETE',
    };

    const uri = `/users/${user.id}`;

    return fetch(uri, options).then((res) => res.status === 204);
  },
};
