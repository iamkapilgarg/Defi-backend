const knex = require('../../knexfile');

const getProjectsByInvestorId = (id) => {
  return knex('fundings')
  .join('projects', 'fundings.project_id', 'projects.id')
  .join('users', 'fundings.user_id', 'users.auth_id')
  .where('auth_id.id', id)
  .select('projects.id as id',
    'projects.name',
    'projects.description',
    'projects.target_amount',
    'projects.target_date',
    'projects.min_amount',
    'projects.link',
    'projects.round',
    'projects.contract',
    'projects.user_id',
    'projects.created_at',
    'projects.updated_at',
    'projects.deleted_at',
    'projects.image',
    'projects.wallet_id'
  );
};

const getFundingsByProjectID = (id) => {
  return knex('fundings')
  .where('project_id', id)
  .select('*')
}

const getFundingsByUserID = (id) => {
  return knex('fundings')
  .where('auth_id', id)
  .select('*')
}

const saveFunding = (funding) => {
  return knex('fundings')
      .insert(funding)
      .returning('id');
}

module.exports = {
  getProjectsByInvestorId, saveFunding,getFundingsByProjectID, getFundingsByUserID
}