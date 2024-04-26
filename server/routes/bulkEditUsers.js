export default (users) => async (request, reply) => {
  const { body } = request;

  body.forEach(updatedUser => {
    const user = users.find(({ id }) => id === updatedUser.id);

    Object.assign(user, updatedUser);
  });

  reply.send(body);
};
