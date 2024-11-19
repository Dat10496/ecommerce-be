"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
  db: { host, dbName, port },
} = require("../config/config.mongodb");
console.log(host, dbName, port);
const connectString = `mongodb://${host}:${port}/${dbName}`;

class DataBase {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { colors: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then(() => {
        console.log(`connect DB success ${connectString}`), countConnect();
      })
      .catch((error) => {
        console.error("Connect DB error:", error);
      });
  }

  static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }
}

module.exports = DataBase.getInstance();
