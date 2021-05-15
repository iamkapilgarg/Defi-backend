const knex = require('../../knexfile');

const getProjectById = (id) => {
  return knex('projects')
  .join('users', 'users.auth_id', 'projects.auth_id')
    .where('projects.id', id)
    .select('projects.*', 'users.name as username', 'users.id as user_id');
}

const listProjects = () => {
  return knex('projects')
  .join('users', 'users.auth_id', 'projects.auth_id')
    .select('projects.*', 'users.name as username', 'users.id as user_id');
}

const getProjectsByUserId = (id) => {
  return knex('projects')
  .join('users', 'users.auth_id', 'projects.auth_id')
  .where('users.auth_id', id)
  .select('projects.*', 'users.name as username', 'users.id as user_id');
}

const saveProject = (project) => {
  return knex('projects')
      .insert(project)
      .returning('id');
}

module.exports = {
  getProjectById,
  listProjects,
  getProjectsByUserId,
  saveProject
}