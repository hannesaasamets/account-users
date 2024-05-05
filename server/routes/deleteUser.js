import store from '../store.js';

export default async (request, reply) => {
  const { users } = store;
  const { userId } = request.params;

  const userIndex = users.findIndex(user => user.id === parseInt(userId));

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    reply.code(204).send(); // HTTP 204 No Content
  } else {
    reply.code(404).send({
      message: 'User not found',
    });
  }
};
