const knex = require('../../knexfile');

const getUserById = (id) => {
    return knex('users')
        .where('id', id)
        .select('*');
}

const getUserByAuthId = (authId) => {
    return knex('users')
        .where('auth_id', authId)
        .select('*');
}

const addUsers = (user) => {
  return knex('users')
      .insert(user)
      .returning('id');
}

module.exports = {
  getUserById, getUserByAuthId, addUsers
}
