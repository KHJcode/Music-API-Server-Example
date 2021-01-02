"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lengthStdCheck = void 0;

var lengthStdCheck = (req, res, next) => {
  var {
    n
  } = req.params;

  if (1 <= n) {
    return next();
  }

  res.status(500).json('error');
};

exports.lengthStdCheck = lengthStdCheck;