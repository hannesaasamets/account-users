import Users from '../users.js';

export default (users) => async (request, reply) => {
  users.length = 0;
  users.push(...structuredClone(Users));
  reply.code(200).send();
};
