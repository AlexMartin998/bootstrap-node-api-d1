'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = require("../middlewares");

var _controllers = require("../controllers");

var router = (0, _express.Router)(); // All routes will be protected

router.use(_middlewares.protectWithJwt);
router.route('/').post((0, _middlewares.createProjectRules)(), _controllers.createProject).get(_controllers.getProjects);
router.route('/:id').get((0, _middlewares.getProjectRules)(), _controllers.getProject).put((0, _middlewares.projectIdRules)(), _controllers.updateProject)["delete"]((0, _middlewares.projectIdRules)(), _controllers.deleteProject);
router.route('/collaborator/:id').post((0, _middlewares.projectIdRules)(), _controllers.addCollaborator).put((0, _middlewares.removePartnerRules)(), _controllers.removeCollaborator);
var _default = router;
exports["default"] = _default;