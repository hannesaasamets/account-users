export default (users) => async (request, reply) => {
  const { body } = request;

  body.forEach(userForDeletion =>
    users.splice(
      users.findIndex(({ id }) => id === userForDeletion.id),
      1,
    ));

  reply.code(204).send(); // HTTP 204 No Content
};
