'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("./db/db");

var _middlewares = require("./middlewares");

var _routes = require("./routes");

// Initializations:
var app = (0, _express["default"])(); // Middlewares

(0, _middlewares.setupMiddlewares)(app); // Routes

app.use('/auth', _routes.authRoutes);
app.use('/users', _routes.usersRoutes);
app.use('/projects', _routes.projectsRoutes);
app.use('/tasks', _routes.tasksRoutes);
app.use(_middlewares.notFoundMiddleware);
var _default = app;
exports["default"] = _default;