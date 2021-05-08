const knex = require('../../knexfile');

const getCommentsByProjectId = (id) => {
  return knex('comments')
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