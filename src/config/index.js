'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRETORKEY_JWT = exports.PORT = exports.MONGODB_URI = exports.FRONTEND_URL = exports.EMAIL_USER = exports.EMAIL_PORT = exports.EMAIL_PASS = exports.EMAIL_HOST = void 0;

var _dotenv = require("dotenv");

if (process.env.NODE_ENV !== 'producction') (0, _dotenv.config)();
var PORT = process.env.PORT;
exports.PORT = PORT;
var MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
var EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_USER = EMAIL_USER;
var EMAIL_PASS = process.env.EMAIL_PASS;
exports.EMAIL_PASS = EMAIL_PASS;
var EMAIL_HOST = process.env.EMAIL_HOST;
exports.EMAIL_HOST = EMAIL_HOST;
var EMAIL_PORT = process.env.EMAIL_PORT;
exports.EMAIL_PORT = EMAIL_PORT;
var FRONTEND_URL = process.env.FRONTEND_URL;
exports.FRONTEND_URL = FRONTEND_URL;
var SECRETORKEY_JWT = process.env.SECRETORKEY_JWT;
exports.SECRETORKEY_JWT = SECRETORKEY_JWT;