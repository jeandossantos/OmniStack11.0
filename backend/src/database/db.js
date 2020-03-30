const knex = require('knex');
const config = require('../../knexfile');

const configMode = (process.env.NODE_ENV === 'test') ? config.test : config.development;

module.exports = knex(configMode);