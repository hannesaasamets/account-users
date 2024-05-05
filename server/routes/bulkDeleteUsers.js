import store from '../store.js';

export default async (request, reply) => {
  const { users } = store;
  const { body: usersForDeletion } = request;

  store.users = users.filter(({ id }) =>
    !usersForDeletion.some(userForDeletion =>
      userForDeletion.id === id));

  reply.code(204).send(); // HTTP 204 No Content
};
