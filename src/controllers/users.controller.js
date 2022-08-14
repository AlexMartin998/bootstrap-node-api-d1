'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = exports.isAuthenticated = exports.getUserByEmail = exports.genRecoveryToken = exports.genNewPassword = exports.confirmUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var _helpers = require("../helpers");

var confirmUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.params.token;
            _context.prev = 1;
            _context.next = 4;
            return _models.User.findOneAndUpdate({
              token: token
            }, {
              token: null,
              confirmed: true
            });

          case 4:
            res.status(200).json({
              msg: 'Successful confirmation!'
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function confirmUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.confirmUser = confirmUser;

var genRecoveryToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = req.body.email;
            _context2.next = 3;
            return _models.User.findOne({
              email: email
            });

          case 3:
            user = _context2.sent;

            if (!(!user || !user.confirmed)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              msg: 'Usuario no registrado!'
            }));

          case 6:
            _context2.prev = 6;
            user.token = (0, _helpers.genId)();
            _context2.next = 10;
            return user.save();

          case 10:
            _context2.next = 12;
            return (0, _helpers.emailResetPassword)({
              email: email,
              name: user.name,
              token: user.token
            });

          case 12:
            res.status(200).json({
              msg: 'Se le ha enviado un email con instrucciones.'
            });
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](6);
            console.log(_context2.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 15]]);
  }));

  return function genRecoveryToken(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.genRecoveryToken = genRecoveryToken;

var validateToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", res.status(200).json({
              msg: 'Successful validation!'
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validateToken(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.validateToken = validateToken;

var genNewPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var token, password, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            token = req.params.token;
            password = req.body.password;
            _context4.prev = 2;
            _context4.next = 5;
            return _models.User.findOne({
              token: token
            });

          case 5:
            user = _context4.sent;
            user.token = null;
            user.password = password;
            _context4.next = 10;
            return user.save();

          case 10:
            res.status(201).json({
              msg: 'Password actualizada correctamente!'
            });
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](2);
            console.log(_context4.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 13]]);
  }));

  return function genNewPassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.genNewPassword = genNewPassword;

var isAuthenticated = function isAuthenticated(req, res) {
  var authenticatedUser = req.authenticatedUser;
  if (!authenticatedUser) return res.status(401).json({
    msg: 'Unauthorized!'
  });
  res.status(200).json({
    user: authenticatedUser
  });
};

exports.isAuthenticated = isAuthenticated;

var getUserByEmail = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var email, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            email = req.body.email;
            _context5.next = 3;
            return _models.User.findOne({
              email: email
            });

          case 3:
            user = _context5.sent;
            res.status(200).json({
              user: user
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getUserByEmail(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUserByEmail = getUserByEmail;