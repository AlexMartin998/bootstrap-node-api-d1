'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genJWT = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config");

var genJWT = function genJWT(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, _config.SECRETORKEY_JWT, {
    expiresIn: '24h'
  });
};

exports.genJWT = genJWT;