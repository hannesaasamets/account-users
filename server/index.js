import Fastify from 'fastify';
import fetchUsers from './routes/fetchUsers.js';
import bulkEditUsers from './routes/bulkEditUsers.js';
import bulkDeleteUsers from './routes/bulkDeleteUsers.js';
import editUser from './routes/editUser.js';
import deleteUser from './routes/deleteUser.js';
import resetUsersToInitialState from './routes/resetUsersToInitialState.js';

const fastify = Fastify({
  logger: true,
});

fastify.get('/users', fetchUsers);
fastify.patch('/users', bulkEditUsers);
fastify.patch('/users/:userId', editUser);
fastify.delete('/users', bulkDeleteUsers);
fastify.delete('/users/:userId', deleteUser);
fastify.get('/reset-users', resetUsersToInitialState);

try {
  await fastify.listen({
    port: 3000,
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
