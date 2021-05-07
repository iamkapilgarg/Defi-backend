const knex = require('../../knexfile');

const getProjectById = (id) => {
  return knex('projects')
    .where('id', id)
    .select('*');
}

const listProjects = () => {
  return knex('projects')
    .select('*');
}

const getProjectsByUserId = (id) => {
  return knex('projects')
  .join('users', 'projects.user_id', 'users.id')
  .where('users.id', id)
  .select('*');
}

module.exports = {
  getProjectById,
  listProjects,
  getProjectsByUserId,
}