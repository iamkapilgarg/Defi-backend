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

module.exports = {
  getUserById, getUserByAuthId
}
