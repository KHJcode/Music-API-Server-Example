"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

var _Music = _interopRequireDefault(require("./Music"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';

var config = require('../../config/config')[env];

var sequelize = new _sequelize.default(config.database, config.username, config.password, config);
var db = {};
db.sequelize = sequelize;
db.Sequelize = _sequelize.default;
db['Music'] = (0, _Music.default)(sequelize, _sequelize.default);
module.exports = db;