// middlewares.js

const express = require("express");

const setMiddlewares = (app) => {
  // Template setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(function (req, res, next) {
    res.locals = {
      codex: require("./helpers/state-list"),
      capitalize: require("./helpers/capitalize"),
      findStateCode: require("./helpers/find-state-code"),
    };
    next();
  });
};

module.exports = setMiddlewares;
