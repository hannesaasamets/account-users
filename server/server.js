import Fastify from 'fastify';
import Users from './users.js';
import fetchUsers from './routes/fetchUsers.js';
import bulkEditUsers from './routes/bulkEditUsers.js';
import bulkDeleteUsers from './routes/bulkDeleteUsers.js';
import editUser from './routes/editUser.js';
import deleteUser from './routes/deleteUser.js';
import resetUsersToInitialState from './routes/resetUsersToInitialState.js';

const users = structuredClone(Users);

const fastify = Fastify({
  logger: true,
});

fastify.get('/users', fetchUsers(users));
fastify.patch('/users', bulkEditUsers(users));
fastify.patch('/users/:userId', editUser(users));
fastify.delete('/users', bulkDeleteUsers(users));
fastify.delete('/users/:userId', deleteUser(users));
fastify.get('/reset-users', resetUsersToInitialState(users));

try {
  await fastify.listen({
    port: 3000,
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
