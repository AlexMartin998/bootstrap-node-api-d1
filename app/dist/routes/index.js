'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authRoutes", {
  enumerable: true,
  get: function get() {
    return _auth["default"];
  }
});
Object.defineProperty(exports, "projectsRoutes", {
  enumerable: true,
  get: function get() {
    return _projects["default"];
  }
});
Object.defineProperty(exports, "tasksRoutes", {
  enumerable: true,
  get: function get() {
    return _tasks["default"];
  }
});
Object.defineProperty(exports, "usersRoutes", {
  enumerable: true,
  get: function get() {
    return _users["default"];
  }
});

var _auth = _interopRequireDefault(require("./auth.routes"));

var _users = _interopRequireDefault(require("./users.routes"));

var _projects = _interopRequireDefault(require("./projects.routes"));

var _tasks = _interopRequireDefault(require("./tasks.routes"));