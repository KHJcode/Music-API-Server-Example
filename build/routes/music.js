"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _sequelize = require("sequelize");

var _models = require("../models");

var _length = require("../middleware/length");

var _admin = require("../middleware/admin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

var length_std = 15;
router.get('/', (req, res, next) => {
  try {
    res.status(200).json('Hello, Music Router!');
  } catch (err) {
    next(err);
  }
});
router.get('/count/all', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var data = yield _models.Music.count({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/list/:n', _length.lengthStdCheck, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        n
      } = req.params;
      var data = yield _models.Music.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        order: [['id', 'DESC']],
        offset: (n - 1) * length_std,
        limit: n * length_std
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/count/search/:keyword', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        keyword
      } = req.params;
      var data = yield _models.Music.count({
        where: {
          [_sequelize.Op.or]: [{
            name: {
              [_sequelize.Op.like]: '%' + keyword + '%'
            }
          }, {
            creater: {
              [_sequelize.Op.like]: '%' + keyword + '%'
            }
          }]
        }
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/search/:keyword/:n', _length.lengthStdCheck, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        keyword,
        n
      } = req.params;
      var data = yield _models.Music.findAll({
        where: {
          [_sequelize.Op.or]: [{
            name: {
              [_sequelize.Op.like]: '%' + keyword + '%'
            }
          }, {
            creater: {
              [_sequelize.Op.like]: '%' + keyword + '%'
            }
          }]
        },
        order: [['name', 'DESC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        offset: (n - 1) * length_std,
        limit: n * length_std
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/popular/:n', _length.lengthStdCheck, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    try {
      var n = parseInt(req.params.n);
      var data = yield _models.Music.findAll({
        order: [['view', 'DESC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        offset: n - 1,
        limit: n
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
router.post('/view/:id', _admin.adminCheck, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        id
      } = req.params;
      yield _models.sequelize.query("update music set view = view + 1 where id = ".concat(id)).then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
    } catch (err) {
      next(err);
    }
  });

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
router.post('/create', _admin.adminCheck, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        name,
        file,
        creater,
        image
      } = req.body;
      yield _models.Music.create({
        name,
        file,
        creater,
        image
      }).then(result => {
        res.status(201).json(result ? 'success' : 'error');
      });
    } catch (err) {
      next(err);
    }
  });

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
router.post('/update', _admin.adminCheck, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        id,
        name,
        file,
        creater,
        image
      } = req.body;
      yield _models.Music.update({
        name,
        file,
        creater,
        image
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

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}());
router.post('/delete', _admin.adminCheck, /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        id
      } = req.body;
      yield _models.Music.destroy({
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

  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;