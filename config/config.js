require('dotenv').config();

const env = process.env;

const development = {
  "username": env.DB_USERNAME_DEV,
  "password": env.DB_PASSWORD_DEV,
  "database": env.DB_NAME_DEV,
  "host": env.DB_HOST_DEV,
  "dialect": "mysql",
};

const test = {
  "username": env.DB_USERNAME_TEST,
  "password": env.DB_PASSWORD_TEST,
  "database": env.DB_NAME_TEST,
  "host": env.DB_HOST_TEST,
  "dialect": "mysql",
};

const production = {
  "username": env.DB_USERNAME_PROD,
  "password": env.DB_PASSWORD_PROD,
  "database": env.DB_NAME_PROD,
  "host": env.DB_HOST_PROD,
  "dialect": "mysql",
};

module.exports = {
  development,
  test,
  production,
};
