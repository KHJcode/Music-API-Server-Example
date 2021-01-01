"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _getCoord = _interopRequireDefault(require("../script/getCoord"));

var _parsing = _interopRequireDefault(require("../script/parsing"));

var _admin = require("../middleware/admin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).json('Hello, Weather Router!');
  } catch (err) {
    next(err);
  }
});
router.get('/get/:mode/:id/:v1/:v2', _admin.weatherUserIdCheck, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        v1,
        v2,
        mode
      } = req.params;
      var rs = (0, _getCoord.default)('toXY', v1, v2);
      var url = "https://www.weather.go.kr/weather/forecast/digital_forecast.jsp?x=".concat(rs.x, "&y=").concat(rs.y, "&unit=K");
      yield (0, _parsing.default)(url, mode).then(data => {
        res.status(200).json(data);
      }, error => {
        console.log(error);
        return res.status(404).json('Not found.');
      });
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;