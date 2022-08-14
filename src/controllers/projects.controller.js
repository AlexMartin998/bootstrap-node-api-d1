'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProject = exports.removeCollaborator = exports.getProjects = exports.getProject = exports.deleteProject = exports.createProject = exports.addCollaborator = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var createProject = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, description, client, deliveryDate, authenticatedUser, newProject;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, description = _req$body.description, client = _req$body.client, deliveryDate = _req$body.deliveryDate;
            authenticatedUser = req.authenticatedUser;
            newProject = new _models.Project({
              name: name,
              description: description,
              client: client,
              deliveryDate: deliveryDate
            });
            newProject.owner = authenticatedUser._id;
            _context.prev = 4;
            _context.next = 7;
            return newProject.save();

          case 7:
            res.status(201).json({
              msg: 'Proyecto creado correctamente!',
              project: newProject
            });
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 10]]);
  }));

  return function createProject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProject = createProject;

var getProjects = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var authenticatedUser, ownProjects, _yield$Promise$all, _yield$Promise$all2, projects, total;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            authenticatedUser = req.authenticatedUser;
            ownProjects = {
              owner: authenticatedUser._id
            };
            _context2.prev = 2;
            _context2.next = 5;
            return Promise.all([_models.Project.find({
              $or: [{
                collaborators: {
                  $in: authenticatedUser._id
                }
              }, {
                owner: {
                  $in: authenticatedUser._id
                }
              }]
            }).select('-tasks'), _models.Project.countDocuments(ownProjects)]);

          case 5:
            _yield$Promise$all = _context2.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            projects = _yield$Promise$all2[0];
            total = _yield$Promise$all2[1];
            res.status(200).json({
              total: total,
              projects: projects
            });
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 12]]);
  }));

  return function getProjects(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProjects = getProjects;

var getProject = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, project;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _models.Project.findById(id).populate('owner', 'email name').populate('collaborators', 'email name').populate({
              path: 'tasks',
              populate: {
                path: 'completedBy',
                select: 'name'
              }
            });

          case 3:
            project = _context3.sent;
            // populate a 1 populate
            res.status(200).json({
              project: project
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getProject(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProject = getProject;

var updateProject = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, name, client, description, deliveryDate, project;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, client = _req$body2.client, description = _req$body2.description, deliveryDate = _req$body2.deliveryDate;
            _context4.prev = 2;
            _context4.next = 5;
            return _models.Project.findByIdAndUpdate(id, {
              name: name,
              client: client,
              description: description,
              deliveryDate: deliveryDate
            }, {
              "new": true
            });

          case 5:
            project = _context4.sent;
            res.status(200).json({
              msg: 'Proyecto actualizado satisfactoriamente!',
              project: project
            });
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            console.log(_context4.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 9]]);
  }));

  return function updateProject(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateProject = updateProject;

var deleteProject = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _models.Project.findByIdAndDelete(id);

          case 4:
            res.status(200).json({
              msg: 'Proyecto eliminado satisfactoriamente!'
            });
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function deleteProject(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // Collaborators


exports.deleteProject = deleteProject;

var addCollaborator = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, email, project, user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            email = req.body.email;
            _context6.prev = 2;
            _context6.next = 5;
            return _models.Project.findById(id);

          case 5:
            project = _context6.sent;
            _context6.next = 8;
            return _models.User.findOne({
              email: email
            });

          case 8:
            user = _context6.sent;

            if (user) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              ok: false,
              msg: 'Usuario no encontrado!'
            }));

          case 11:
            if (!(project.owner._id.toString() === user._id.toString())) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt("return", res.status(401).json({
              msg: 'El creador del proyecto no puede ser colaborador!',
              ok: false
            }));

          case 13:
            if (!project.collaborators.includes(user._id)) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.status(401).json({
              msg: 'El usuario ya es colaborador en este proyecto!'
            }));

          case 15:
            project.collaborators.push(user._id);
            _context6.next = 18;
            return project.save();

          case 18:
            res.status(200).json({
              msg: 'Colaborador agregado satisfactoriamente!'
            });
            _context6.next = 25;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](2);
            console.log(_context6.t0);
            res.status(500).json({
              msg: 'Algo salió mal!'
            });

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 21]]);
  }));

  return function addCollaborator(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addCollaborator = addCollaborator;

var removeCollaborator = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, partnerId, project;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            partnerId = req.body.partnerId;
            _context7.next = 4;
            return _models.Project.findById(id);

          case 4:
            project = _context7.sent;
            // Delete collaborator - pull of Mongoose
            project.collaborators.pull(partnerId);
            _context7.next = 8;
            return project.save();

          case 8:
            res.status(200).json({
              msg: 'Colaborador removido correctamente!'
            });

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function removeCollaborator(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.removeCollaborator = removeCollaborator;