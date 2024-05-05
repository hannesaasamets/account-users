import store from '../store.js';

export default async (request, reply) => {
  const { users } = store;
  const { body: updatedUsers } = request;

  updatedUsers.forEach(userUpdates => {
    const user = users.find(({ id }) => id === userUpdates.id);

    Object.assign(user, userUpdates);
  });

  reply.send(updatedUsers);
};
