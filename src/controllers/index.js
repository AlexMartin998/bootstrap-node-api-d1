'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require("./auth.controller");

Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _auth[key];
    }
  });
});

var _users = require("./users.controller");

Object.keys(_users).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _users[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _users[key];
    }
  });
});

var _projects = require("./projects.controller");

Object.keys(_projects).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _projects[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _projects[key];
    }
  });
});

var _tasks = require("./tasks.controller");

Object.keys(_tasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tasks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tasks[key];
    }
  });
});