"use strict";

const moment = require("moment");

module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "jasei8492hbasHLKJHUG",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASS || "",
    database: process.env.MYSQL_DB || "",
    port: process.env.MYSQL_PORT || "3306",
  },
  API_REST: {
    endpoint: process.env.API,
  },
};
