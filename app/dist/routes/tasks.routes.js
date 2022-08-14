'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = require("../middlewares");

var _controllers = require("../controllers");

var router = (0, _express.Router)();
router.use(_middlewares.protectWithJwt);
router.post('/', (0, _middlewares.createTaskRules)(), _controllers.createTask);
router.route('/:id').get((0, _middlewares.taskIdRules)(), _controllers.getTask).put((0, _middlewares.updateTaskRules)(), _controllers.updateTask)["delete"]((0, _middlewares.taskIdRules)(), _controllers.deleteTask);
router.patch('/state/:id', (0, _middlewares.toggleStateRules)(), _controllers.toggleState);
var _default = router;
exports["default"] = _default;