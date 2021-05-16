const knex = require('../../knexfile');

const getLikesByUserID = (id) => {
  return knex('likes')
  .join('users', 'users.auth_id', 'likes.auth_id')
  .join('projects', 'projects.id', 'likes.project_id')
  .where('likes.auth_id', id)
  .select('projects.*', 'users.name as username', 'users.id as user_id');
};

const saveLikes = (like) => {
  return knex('likes')
      .insert(like)
      .returning('id');
}

module.exports = {
  getLikesByUserID, saveLikes
}