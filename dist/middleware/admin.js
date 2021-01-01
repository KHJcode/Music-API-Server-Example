"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminCheck = void 0;

var adminCheck = function adminCheck(req, res, next) {
  var key = req.body.key;

  if (key === process.env.ADMIN_KEY) {
    return next();
  }

  res.status(401).json("permission denied.");
};

exports.adminCheck = adminCheck;