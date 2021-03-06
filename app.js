const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const favicon = require("serve-favicon");
const compression = require("compression");

const Util = require("./src/utli");
const LyricRouter = require("./routes/LyricRouter");
const Crawler = require("./src/crawler");
const app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));

if (app.get("env") === "production") {
  console.log("==========PRODUCTION Mode==========");
  app.set("trust proxy", 1); // trust first proxy
  // sess.cookie.secure = true // serve secure cookies only https
  app.use(
    logger("dev", {
      skip: function(req, res) {
        return res.statusCode < 400;
      }
    })
  );
} else {
  console.log("==========Development Mode==========");
  /** Webpack **/
  // const webpack = require('webpack');
  // const webpackDevMiddleware = require('webpack-dev-middleware')
  // const webpackConfig = require('./webpack.config');
  // const compiler = webpack(webpackConfig);
  // app.use(webpackDevMiddleware(compiler, {
  //     // noInfo: true,
  //     publicPath: webpackConfig.output.publicPath,
  //     // quiet: true,
  //     stats: {
  //         colors: true
  //     },
  // }));
  app.use(logger("dev"));
}
app.use(bodyParser.json());
app.use(compression());

app.use("/", LyricRouter);

module.exports = app;
