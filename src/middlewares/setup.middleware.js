'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupMiddlewares = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _morgan = _interopRequireDefault(require("morgan"));

var _config = require("../config");

var allowedDomains = [_config.FRONTEND_URL];
var corsOptions = {
  origin: function origin(_origin, callbak) {
    console.log(_origin);
    if (allowedDomains.includes(_origin)) return callbak(null, true);else return callbak(new Error("".concat(_origin, " has been blocked by CORS")));
  }
};

var setupMiddlewares = function setupMiddlewares(app) {
  app.use((0, _cors["default"])(corsOptions));
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: false
  }));
  app.use((0, _compression["default"])()).use((0, _helmet["default"])());
  app.use((0, _morgan["default"])('dev')); // Other middlewares
};

exports.setupMiddlewares = setupMiddlewares;