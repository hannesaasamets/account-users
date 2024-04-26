export default (users) => async (request, reply) => {
  const { userId } = request.params;

  const userIndex = users.findIndex(user => user.id === +userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    reply.code(204).send(); // HTTP 204 No Content
  } else {
    reply.code(404).send({
      message: 'User not found',
    });
  }
};
