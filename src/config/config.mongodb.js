" use strict";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    dbName: process.env.DEV_DB_NAME || "devDB",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3055,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    dbName: process.env.PRO_DB_NAME || "proDB",
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
