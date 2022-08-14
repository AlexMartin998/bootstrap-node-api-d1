'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpServer = void 0;

var _http = require("http");

var _socket = require("socket.io");

var _app = _interopRequireDefault(require("./app"));

var _sockets = _interopRequireDefault(require("./sockets/sockets"));

var _config = require("./config");

console.clear();
var server = (0, _http.createServer)(_app["default"]);
var httpServer = server.listen(_config.PORT, function () {
  console.log('Server is running on port', _config.PORT);
});
exports.httpServer = httpServer;
var io = new _socket.Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: _config.FRONTEND_URL
  }
});
(0, _sockets["default"])(io);