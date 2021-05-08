const knex = require('../../knexfile');

const getCommentsByProjectId = (id) => {
  return knex('comments')
  .join('projects', 'comments.project_id', 'projects.id')
  .where('projects.id', id)
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