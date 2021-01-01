"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = require("../models");

var _admin = require("../middleware/admin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).json('Hello, Music Router!');
  } catch (err) {
    next(err);
  }
});
router.post('/create', _admin.adminCheck, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        name,
        file,
        creater
      } = req.body;
      yield _models.Music.create({
        name,
        file,
        creater
      }).then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/update', _admin.adminCheck, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        id,
        name,
        file,
        creater
      } = req.body;
      yield _models.Music.update({
        name,
        file,
        creater
      }, {
        where: {
          id
        }
      }).then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
    } catch (err) {
      next(err);
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;