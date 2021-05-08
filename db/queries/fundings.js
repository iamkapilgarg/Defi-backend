const knex = require('../../knexfile');

const getProjectsByInvestorId = (id) => {
  return knex('fundings')
  .join('projects', 'fundings.project_id', 'projects.id')
  .join('users', 'fundings.user_id', 'users.id')
  .where('users.id', id)
  .select('*');
};

const saveFunding = (funding) => {
  return knex('fundings')
      .insert(funding)
      .returning('id');
}

module.exports = {
  getProjectsByInvestorId, saveFunding
}