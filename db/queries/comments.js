const knex = require('../../knexfile');

const getCommentsByProjectId = (id) => {
  return knex('comments')
  .join('users', 'comments.auth_id', 'users.auth_id')
  .where('project_id', id)
  .select('*');
};

const saveComments = (comment) => {
  return knex('comments')
      .insert(comment)
      .returning('id');
}

module.exports = {
  getCommentsByProjectId, saveComments
}