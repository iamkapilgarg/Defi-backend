const knex = require('../../knexfile');

const getImagesByProjectsId = (projectId) => {
    return knex('images')
        .where('project_id', projectId)
        .select('*');
}

const saveImage = (image) => {
  return knex('images')
  .insert(image)
  .returning('id');
}

module.exports = {
  getImagesByProjectsId, saveImage
}
