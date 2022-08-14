'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailResetPassword = exports.emailRegister = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _config = require("./../config");

var setTransport = function setTransport() {
  return _nodemailer["default"].createTransport({
    host: _config.EMAIL_HOST,
    port: _config.EMAIL_PORT,
    auth: {
      user: _config.EMAIL_USER,
      pass: _config.EMAIL_PASS
    }
  });
};

var emailRegister = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(emailData) {
    var name, email, token, transport;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = emailData.name, email = emailData.email, token = emailData.token;
            transport = setTransport(); // Send mail with defined transport object

            _context.next = 4;
            return transport.sendMail({
              from: '"UpTask - Administrador de Proyectos 👻" <hola@uptask.com>',
              to: email,
              subject: 'UpTask - Confirma tu cuenta ✔',
              text: 'Comprueba tu cuenta en UpTask',
              html: "<p>Hola ".concat(name, ", comprueba tu cuenta en UpTask</p>\n    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:\n      <a href=\"").concat(_config.FRONTEND_URL, "/confirm-account/").concat(token, "\">Comrpobar cuenta</a>\n    </p>\n\n    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>\n  ")
            });

          case 4:
            console.log("".concat(_config.FRONTEND_URL, "/confirm-account/").concat(token));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function emailRegister(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.emailRegister = emailRegister;

var emailResetPassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(emailData) {
    var name, email, token, transport;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = emailData.name, email = emailData.email, token = emailData.token;
            console.log('email:', {
              name: name,
              email: email,
              token: token
            });
            transport = setTransport(); // Send mail

            _context2.next = 5;
            return transport.sendMail({
              from: '"UpTask - Administrador de Proyectos 👻" <hola@uptask.com>',
              to: email,
              subject: 'UpTask - Reestablece tu Password',
              text: 'Reestablece tu Password',
              html: "<p>Hola ".concat(name, ", has solicitado restablecer tu password.</p>\n\n      <p>Sigue el siguiente enlace para generar tu nuevo password:\n        <a href=\"").concat(_config.FRONTEND_URL, "/forgot-password/").concat(token, "\">Restablecer Password</a>\n      </p>\n\n      <p>Si tu no solicitaste esto, puedes ignorar este mensaje.</p>\n    ")
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function emailResetPassword(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.emailResetPassword = emailResetPassword;