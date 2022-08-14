'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.updateTaskRules = exports.toggleStateRules = exports.taskIdRules = exports.signUpRules = exports.removePartnerRules = exports.projectIdRules = exports.loginRules = exports.getUserByEmailRules = exports.getProjectRules = exports.genRecoveryTokenRules = exports.genNewPasswordRules = exports.emailPassRules = exports.createTaskRules = exports.createProjectRules = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _expressValidator = require("express-validator");

var _helpers = require("../helpers");

var _ = require(".");

var validate = function validate(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  return next();
}; // Auth


exports.validate = validate;

var emailPassRules = function emailPassRules() {
  return [(0, _expressValidator.body)('email', 'Invalid email!').isEmail(), (0, _expressValidator.body)('password', 'Password must be longer than 6 characters!').isLength({
    min: 6
  })];
};

exports.emailPassRules = emailPassRules;

var signUpRules = function signUpRules() {
  return [(0, _expressValidator.body)('name', 'Invalid name!').notEmpty()].concat((0, _toConsumableArray2["default"])(emailPassRules()), [validate, (0, _expressValidator.body)('email').custom(function (email) {
    return (0, _helpers.isAlreadyRegistered)(email, 'user');
  }), validate]);
};

exports.signUpRules = signUpRules;

var loginRules = function loginRules() {
  return [].concat((0, _toConsumableArray2["default"])(emailPassRules()), [validate, _.checkLoginCredentials]);
}; // Users


exports.loginRules = loginRules;

var genRecoveryTokenRules = function genRecoveryTokenRules() {
  return [(0, _expressValidator.body)('email', 'Invalid email!').isEmail(), validate];
};

exports.genRecoveryTokenRules = genRecoveryTokenRules;

var genNewPasswordRules = function genNewPasswordRules() {
  return [(0, _expressValidator.body)('password', 'Password is required!').notEmpty(), validate, _.checkToken];
};

exports.genNewPasswordRules = genNewPasswordRules;

var getUserByEmailRules = function getUserByEmailRules() {
  return [(0, _expressValidator.body)('email', 'Invalid email!').isEmail(), validate, (0, _expressValidator.body)('email').custom(_helpers.isEmailRegistered), validate];
}; // Projects


exports.getUserByEmailRules = getUserByEmailRules;

var createProjectRules = function createProjectRules() {
  return [(0, _expressValidator.body)('name', 'Invalid name!').notEmpty(), (0, _expressValidator.body)('description', 'Invalid description!').notEmpty(), (0, _expressValidator.body)('client', 'Invalid client!').notEmpty(), validate];
};

exports.createProjectRules = createProjectRules;

var getProjectRules = function getProjectRules() {
  return [(0, _expressValidator.param)('id', 'Invalid ID!').isMongoId(), validate, (0, _expressValidator.param)('id').custom(function (id, _ref) {
    var req = _ref.req;
    return (0, _helpers.isSameUserOrPartner)(id, 'project', req);
  }), validate];
};

exports.getProjectRules = getProjectRules;

var projectIdRules = function projectIdRules() {
  return [(0, _expressValidator.param)('id', 'Invalid ID!').isMongoId(), validate, (0, _expressValidator.param)('id').custom(function (id, _ref2) {
    var req = _ref2.req;
    return (0, _helpers.idExistInDB)(id, 'project', req);
  }), validate];
};

exports.projectIdRules = projectIdRules;

var removePartnerRules = function removePartnerRules() {
  return [(0, _expressValidator.param)('id', 'Invalid ID!').isMongoId(), (0, _expressValidator.body)('partnerId', 'Invalid ID!').isMongoId(), validate, (0, _expressValidator.param)('id').custom(function (id, _ref3) {
    var req = _ref3.req;
    return (0, _helpers.idExistInDB)(id, 'project', req);
  }), validate];
}; // Tasks


exports.removePartnerRules = removePartnerRules;

var createTaskRules = function createTaskRules() {
  return [(0, _expressValidator.body)('name', 'Invalid name!').notEmpty(), (0, _expressValidator.body)('description', 'Invalid description!').notEmpty(), (0, _expressValidator.body)('project', 'Invalid project!').isMongoId(), (0, _expressValidator.body)('priority').custom(_helpers.isValidPriority), validate, (0, _expressValidator.body)('project').custom(function (id, _ref4) {
    var req = _ref4.req;
    return (0, _helpers.idExistInDB)(id, 'project', req);
  }), validate];
};

exports.createTaskRules = createTaskRules;

var taskIdRules = function taskIdRules() {
  return [(0, _expressValidator.param)('id', 'Invalid ID!').isMongoId(), validate, (0, _expressValidator.param)('id').custom(function (id, _ref5) {
    var req = _ref5.req;
    return (0, _helpers.idExistInDB)(id, 'task', req);
  }), validate];
};

exports.taskIdRules = taskIdRules;

var updateTaskRules = function updateTaskRules() {
  return [(0, _expressValidator.body)('priority').custom(_helpers.isValidPriority), validate].concat((0, _toConsumableArray2["default"])(taskIdRules()));
};

exports.updateTaskRules = updateTaskRules;

var toggleStateRules = function toggleStateRules() {
  return [(0, _expressValidator.param)('id', 'Invalid ID!').isMongoId(), validate, (0, _expressValidator.param)('id').custom(function (id, _ref6) {
    var req = _ref6.req;
    return (0, _helpers.isSameUserOrPartnerTask)(id, 'task', req);
  }), validate];
};

exports.toggleStateRules = toggleStateRules;