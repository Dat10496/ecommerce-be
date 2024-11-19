"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const TIME = 5000;

//count connection to db
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};

//check overload connection to db
const checkOverLoad = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;

    // number of cores
    const numCores = os.cpus().length;

    const memoryUsage = process.memoryUsage().rss;

    //example maximum connection base on number of cores
    const maxConnections = numCores * 5;

    console.log(`Active connection: ${numConnections}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnections > maxConnections) {
      console.log("Connection overload detected");
    }
  }, TIME); // MONITOR EVERY 5 SECONDS
};

module.exports = { countConnect, checkOverLoad };
