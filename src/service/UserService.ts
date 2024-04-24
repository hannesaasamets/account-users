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
      ? Object.keys(params)
        .map((k) => `${encodeURIComponent(k) }=${ encodeURIComponent(params[k])}`)
        .join('&')
      : '';

    return fetch(`https://www.primefaces.org/data/customers?${ queryParams}`).then((res) => res.json());
  },
};
