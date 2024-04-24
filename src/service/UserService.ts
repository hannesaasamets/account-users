import users from '../../server/users.js';

export const UserService = {
  getData() {
    return users;
  },

  getUsersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getUsersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getUsersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getUsersXLarge() {
    return Promise.resolve(this.getData());
  },

  getUsers(params) {
    const queryParams = params
      ? Object.entries(params)
        .map((key, value) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
      : '';

    return fetch(`/users?${queryParams}`).then((res) => res.json());
  },
};
