export default (users) => async (request, reply) => {
  const { userId } = request.params;
  const { body } = request;

  const user = users.find(({ id }) => id === +userId);

  if (user) {
    Object.assign(user, body);
    reply.send(user);
  } else {
    reply.code(404).send({
      message: 'User not found',
    });
  }
};
