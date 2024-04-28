import { filterByValuesCaseInsensitive, sortCaseInsensitive } from '../utils.js';

export default (users) => async (request, reply) => {
  const {
    offset = 0,
    limit = users.length,
    filter = '',
    sortField = 'role',
    sortOrder = 'asc',
  } = request.query;

  const filteredUsers = users
    .filter(filterByValuesCaseInsensitive(filter))
    .sort(sortCaseInsensitive(sortField, sortOrder));
  const paginatedUsers = filteredUsers
    .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

  reply.send({
    users: paginatedUsers,
    offset,
    limit: paginatedUsers.length,
    totalRecords: filteredUsers.length,
    sortField,
  });
};
