'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var _helpers = require("../helpers");

var signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, email, password, newUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            newUser = new _models.User({
              name: name,
              email: email,
              password: password,
              token: (0, _helpers.genId)()
            });
            _context.next = 5;
            return newUser.save();

          case 5:
            _context.next = 7;
            return (0, _helpers.emailRegister)({
              email: email,
              name: name,
              token: newUser.token
            });

          case 7:
            res.status(201).json({
              msg: 'Usuario registrado satisfactoriamente, verifica tu email.'
            });
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              ok: false,
              msg: 'Algo salió mal!'
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, user, jwt;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = req.body.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _models.User.findOne({
              email: email
            });

          case 4:
            user = _context2.sent;
            // Generate JWT
            jwt = (0, _helpers.genJWT)(user.id);
            res.status(200).json({
              msg: 'Successful login!',
              token: jwt,
              user: user
            });
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).json({
              ok: false,
              msg: 'Algo salió mal!'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;