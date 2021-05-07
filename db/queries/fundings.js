const knex = require('../../knexfile');

const getProjectsByInvestorId = (id) => {
  return knex('fundings')
  .join('projects', 'fundings.project_id', 'projects.id')
  .join('users', 'fundings.user_id', 'users.id')
  .where('users.id', id)
  .select('*');
};

module.exports = {
  getProjectsByInvestorId
}