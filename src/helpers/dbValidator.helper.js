'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidPriority = exports.isSameUserOrPartnerTask = exports.isSameUserOrPartner = exports.isEmailRegistered = exports.isAlreadyRegistered = exports.idExistInDB = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var isAlreadyRegistered = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query, collection) {
    var model, checkInCollection;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            checkInCollection = function checkInCollection() {
              if (model) throw new Error("The ".concat(collection).concat(query.includes('@') ? "'s email" : ' name', " is already registered!"));
            };

            _context.t0 = collection;
            _context.next = _context.t0 === 'user' ? 4 : 8;
            break;

          case 4:
            _context.next = 6;
            return _models.User.findOne({
              email: query
            });

          case 6:
            model = _context.sent;
            return _context.abrupt("return", checkInCollection());

          case 8:
            throw new Error('Something went wrong!');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isAlreadyRegistered(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.isAlreadyRegistered = isAlreadyRegistered;

var isSameUserOrPartner = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, collection, req) {
    var authenticatedUser, project;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            authenticatedUser = req.authenticatedUser;
            _context2.next = 3;
            return _models.Project.findById(id);

          case 3:
            project = _context2.sent;

            if (project) {
              _context2.next = 6;
              break;
            }

            throw new Error("".concat(collection, " ID: '").concat(id, " doesn't exist in DB!"));

          case 6:
            if (!(project.owner._id.toString() !== authenticatedUser._id.toString() && !project.collaborators.some(function (partner) {
              return partner._id.toString() === authenticatedUser._id.toString();
            }))) {
              _context2.next = 8;
              break;
            }

            throw new Error('Unauthorized!');

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isSameUserOrPartner(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isSameUserOrPartner = isSameUserOrPartner;

var isSameUer = function isSameUer(model, authenticatedUser) {
  if (model.owner._id.toString() !== authenticatedUser._id.toString()) throw new Error('Unauthorized!');
};

var idExistInDB = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, collection, req) {
    var model, authenticatedUser, checkInCollection;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            authenticatedUser = req.authenticatedUser;

            checkInCollection = function checkInCollection() {
              if (!model) throw new Error("".concat(collection, " ID: '").concat(id, " doesn't exist in DB!"));
            };

            _context3.t0 = collection;
            _context3.next = _context3.t0 === 'project' ? 5 : _context3.t0 === 'task' ? 10 : 17;
            break;

          case 5:
            _context3.next = 7;
            return _models.Project.findById(id);

          case 7:
            model = _context3.sent;
            checkInCollection();
            return _context3.abrupt("return", isSameUer(model, authenticatedUser));

          case 10:
            _context3.next = 12;
            return _models.Task.findById(id).populate('project');

          case 12:
            model = _context3.sent;
            checkInCollection();

            if (!(model.project.owner._id.toString() !== authenticatedUser._id.toString())) {
              _context3.next = 16;
              break;
            }

            throw new Error('Unauthorized!');

          case 16:
            return _context3.abrupt("return");

          case 17:
            throw new Error('Something went wrong!');

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function idExistInDB(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.idExistInDB = idExistInDB;

var isEmailRegistered = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(email) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.User.findOne({
              email: email
            });

          case 2:
            user = _context4.sent;

            if (!(!user || !user.confirmed)) {
              _context4.next = 5;
              break;
            }

            throw new Error('Usuario no encontrado!');

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function isEmailRegistered(_x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.isEmailRegistered = isEmailRegistered;

var isValidPriority = function isValidPriority(priority) {
  if (!['baja', 'media', 'alta'].includes(priority.toLowerCase())) throw new Error("Invalid priority! - ".concat(priority));
  return true;
};

exports.isValidPriority = isValidPriority;

var isSameUserOrPartnerTask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, collection, req) {
    var authenticatedUser, task;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            authenticatedUser = req.authenticatedUser;
            _context5.next = 3;
            return _models.Task.findById(id).populate('project', 'owner collaborators');

          case 3:
            task = _context5.sent;

            if (task) {
              _context5.next = 6;
              break;
            }

            throw new Error("".concat(collection, " ID: '").concat(id, " doesn't exist in DB!"));

          case 6:
            if (!(task.project.owner._id.toString() !== authenticatedUser._id.toString() && !task.project.collaborators.some(function (partner) {
              return partner._id.toString() === authenticatedUser._id.toString();
            }))) {
              _context5.next = 8;
              break;
            }

            throw new Error('Unauthorized!');

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function isSameUserOrPartnerTask(_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

exports.isSameUserOrPartnerTask = isSameUserOrPartnerTask;