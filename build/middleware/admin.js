"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weatherUserIdCheck = exports.adminCheck = void 0;

var adminCheck = (req, res, next) => {
  var {
    key
  } = req.body;

  if (key === process.env.ADMIN_KEY) {
    return next();
  }

  res.status(401).json("permission denied.");
};

exports.adminCheck = adminCheck;

var weatherUserIdCheck = (req, res, next) => {
  var {
    id
  } = req.params;
  var userkey = ['ZEhWeVltOD0', 'VXpCb1Mxa3lPV3RhVVQwOQ'];

  if (userkey.includes(id)) {
    return next();
  }

  res.status(401).json("permission denied.");
};

exports.weatherUserIdCheck = weatherUserIdCheck;