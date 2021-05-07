const knex = require('../../knexfile');

const getImagesByProjectsId = (projectId) => {
    return knex('images')
        .where('project_id', projectId)
        .select('*');
}

module.exports = {
  getImagesByProjectsId
}
