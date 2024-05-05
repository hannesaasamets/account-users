import store from '../store.js';

export default async (request, reply) => {
  const { users } = store;
  const { userId } = request.params;
  const { body } = request;

  const user = users.find(({ id }) => id === parseInt(userId));

  if (user) {
    Object.assign(user, body);
    reply.send(user);
  } else {
    reply.code(404).send({
      message: 'User not found',
    });
  }
};
