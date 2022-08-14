'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true
  },
  token: {
    type: String,
    "default": null
  },
  confirmed: {
    type: Boolean,
    "default": false
  }
}, {
  versionKey: false,
  timestamps: true
});
UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var hash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (this.isModified('password')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            _context.next = 4;
            return _bcryptjs["default"].hash(this.password, 10);

          case 4:
            hash = _context.sent;
            this.password = hash;
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

UserSchema.methods.comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(password, this.password);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

UserSchema.methods.toJSON = function () {
  var user = this.toObject();
  user.uid = user._id;
  delete user.password;
  delete user._id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.token;
  delete user.confirmed;
  return user;
};

var _default = (0, _mongoose.model)('User', UserSchema);

exports["default"] = _default;