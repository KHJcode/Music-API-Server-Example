"use strict";

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _hpp = _interopRequireDefault(require("hpp"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _models = require("./models");

var _music = _interopRequireDefault(require("./routes/music"));

var _weather = _interopRequireDefault(require("./routes/weather"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
var prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : '6060');

_models.sequelize.sync({
  force: false
}).then(() => {
  console.log('DB connected!');
}).catch(err => {
  console.error(err);
});

if (prod) {
  app.use((0, _hpp.default)());
  app.use((0, _helmet.default)());
  app.use((0, _cors.default)());
}

app.use((0, _morgan.default)(prod ? 'combined' : 'dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true,
  limit: '30mb'
}));
app.use('/music', _music.default);
app.use('/weather', _weather.default);
app.get('*', (err, res, req, next) => {
  console.log(err);
  res.status(500).json('error');
});
app.get('/', (req, res, next) => {
  res.status(200).json('server is test.');
});
app.listen(app.get('port'), () => {
  console.log("Server is running on port ".concat(app.get('port'), "."));
});