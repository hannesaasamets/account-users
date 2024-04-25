import Fastify from 'fastify';
import Users from './users.js';

const users = structuredClone(Users);
const fastify = Fastify({
  logger: true,
});

// Endpoint to retrieve users with pagination, filtering, and sorting
fastify.get('/users', async (request, reply) => {
  const {
    offset = 0,
    limit = users.length,
    filter = '',
    sortField = 'role',
    sortOrder = 'asc',
  } = request.query;

  const filterLowerCaseTrimmed = filter.toLowerCase().trim();

  const filteredUsers = filterLowerCaseTrimmed
    ? users.filter(user =>
      user.name.toLowerCase().includes(filterLowerCaseTrimmed) ||
            user.email.toLowerCase().includes(filterLowerCaseTrimmed) ||
            user.role.toLowerCase().includes(filterLowerCaseTrimmed))
    : users.concat();

  filteredUsers.sort((a, b) => {
    const columnA = String(a[sortField]).toLowerCase();
    const columnB = String(b[sortField]).toLowerCase();

    return sortOrder === 'desc'
      ? columnB.localeCompare(columnA)
      : columnA.localeCompare(columnB);
  });

  const startIndex = parseInt(offset);
  const endIndex = startIndex + parseInt(limit);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  reply.send({
    users: paginatedUsers,
    offset,
    limit: paginatedUsers.length,
    totalRecords: filteredUsers.length,
    sortField,
  });
});

fastify.patch('/users', async (request, reply) => {
  const { body } = request;

  const isEditingAll = typeof body === 'object' && !Array.isArray(body);

  users.forEach(user => {
    const userData = isEditingAll
      ? body
      : body.find(userData => userData.id === user.id);

    if (userData) {
      Object.assign(user, userData);
    }
  });

  reply.send(body);
});

fastify.patch('/users/:userId', async (request, reply) => {
  const { userId } = request.params;
  const { body } = request;

  const user = users.find(user => user.id === parseInt(userId));

  if (user) {
    Object.assign(user, body);
    reply.send(user);
  } else {
    reply.code(404).send({
      message: 'User not found',
    });
  }
});

fastify.delete('/users', async (request, reply) => {
  const { body } = request;

  body.forEach(userForDeletion =>
    users.splice(
      users.findIndex(({ id }) => id === userForDeletion.id),
      1,
    ));

  reply.code(204).send(); // HTTP 204 No Content
});

fastify.delete('/users/:userId', async (request, reply) => {
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
});

fastify.get('/reset-users', async (request, reply) => {
  users.length = 0;
  users.push(...structuredClone(Users));
  reply.code(200).send(); // Respond with HTTP 204 No Content
});

try {
  await fastify.listen({
    port: 3000,
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
