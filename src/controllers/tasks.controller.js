"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.toggleState = exports.getTask = exports.deleteTask = exports.createTask = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var createTask = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, description, priority, project, deliveryDate, newTask, itsProject;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, description = _req$body.description, priority = _req$body.priority, project = _req$body.project, deliveryDate = _req$body.deliveryDate;
            _context.prev = 1;
            newTask = new _models.Task({
              name: name,
              description: description,
              priority: priority,
              project: project,
              deliveryDate: deliveryDate
            });
            _context.next = 5;
            return newTask.save();

          case 5:
            _context.next = 7;
            return _models.Project.findById(project);

          case 7:
            itsProject = _context.sent;
            itsProject.tasks.push(newTask);
            _context.next = 11;
            return itsProject.save();

          case 11:
            res.status(201).json({
              msg: 'Tarea creada satisfactoriamente!',
              task: newTask
            });
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14]]);
  }));

  return function createTask(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTask = createTask;

var getTask = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, task;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _models.Task.findById(id).populate('project', 'name');

          case 3:
            task = _context2.sent;
            res.status(200).json({
              task: task
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTask(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTask = getTask;

var updateTask = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, _req$body2, name, description, priority, deliveryDate, state, task;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, priority = _req$body2.priority, deliveryDate = _req$body2.deliveryDate, state = _req$body2.state;
            _context3.prev = 2;
            _context3.next = 5;
            return _models.Task.findByIdAndUpdate(id, {
              name: name,
              description: description,
              priority: priority,
              deliveryDate: deliveryDate,
              state: state
            }, {
              "new": true
            });

          case 5:
            task = _context3.sent;
            res.status(200).json({
              msg: 'Tarea actualizada correctamente!',
              task: task
            });
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 9]]);
  }));

  return function updateTask(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateTask = updateTask;

var deleteTask = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, task, project;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _models.Task.findByIdAndDelete(id);

          case 4:
            task = _context4.sent;
            _context4.next = 7;
            return _models.Project.findById(task.project);

          case 7:
            project = _context4.sent;
            project.tasks.pull(task._id);
            _context4.next = 11;
            return project.save();

          case 11:
            res.status(200).json({
              msg: 'Tarea eleminada correctamente!'
            });
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 14]]);
  }));

  return function deleteTask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteTask = deleteTask;

var toggleState = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, authenticatedUser, task, savedTask;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            authenticatedUser = req.authenticatedUser;
            _context5.prev = 2;
            _context5.next = 5;
            return _models.Task.findById(id);

          case 5:
            task = _context5.sent;
            _context5.next = 8;
            return _models.Task.findByIdAndUpdate(id, {
              state: !task.state,
              completedBy: authenticatedUser._id
            }, {
              "new": true
            }).populate('project').populate('completedBy');

          case 8:
            savedTask = _context5.sent;
            res.status(200).json({
              task: savedTask
            });
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](2);
            console.log(_context5.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 12]]);
  }));

  return function toggleState(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.toggleState = toggleState;