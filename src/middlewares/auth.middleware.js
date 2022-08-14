'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = exports.checkLoginCredentials = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var checkLoginCredentials = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, email, password, user, matchPass;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _models.User.findOne({
              email: email
            });

          case 3:
            user = _context.sent;
            _context.next = 6;
            return user === null || user === void 0 ? void 0 : user.comparePassword(password);

          case 6:
            matchPass = _context.sent;

            if (!(!user || !matchPass)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: 'Hubo un problema al iniciar sesión. Comprueba tu correo electrónico y contraseña o crea una cuenta.'
            }));

          case 9:
            if (user.confirmed) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              msg: 'Su cuenta no ha sido confirmada!'
            }));

          case 11:
            return _context.abrupt("return", next());

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkLoginCredentials(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkLoginCredentials = checkLoginCredentials;

var checkToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var token, unconfirmedUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.params.token;
            _context2.next = 3;
            return _models.User.findOne({
              token: token
            });

          case 3:
            unconfirmedUser = _context2.sent;

            if (unconfirmedUser) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              msg: 'Token inválido!'
            }));

          case 6:
            return _context2.abrupt("return", next());

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.checkToken = checkToken;