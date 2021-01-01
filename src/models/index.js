import Sequelize from 'sequelize';
import Music from './Music';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db['Music'] = Music(sequelize, Sequelize);

module.exports = db;
