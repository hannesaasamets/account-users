import Users from '../users.js';
import store from '../store.js';

export default async (request, reply) => {
  store.users = structuredClone(Users);

  reply.code(200).send();
};
