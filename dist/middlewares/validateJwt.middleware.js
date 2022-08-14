'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectWithJwt = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../models");

var _config = require("./../config");

var protectWithJwt = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken, tokenJwt, _jwt$verify, id, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bearerToken = req.header('Authorization');

            if (!(!bearerToken || !bearerToken.startsWith('Bearer'))) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              ok: false,
              msg: 'Invalid token!'
            }));

          case 3:
            tokenJwt = bearerToken.split(' ')[1];
            _context.prev = 4;
            _jwt$verify = _jsonwebtoken["default"].verify(tokenJwt, _config.SECRETORKEY_JWT), id = _jwt$verify.id;
            _context.next = 8;
            return _models.User.findById(id).select('name email confirmed');

          case 8:
            user = _context.sent;

            if (!(!user || !user.confirmed)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: 'Invalid token!'
            }));

          case 11:
            req.authenticatedUser = user;
            return _context.abrupt("return", next());

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(401).json({
              msg: 'Invalid token!'
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 15]]);
  }));

  return function protectWithJwt(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.protectWithJwt = protectWithJwt;