'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post('/signup', (0, _middlewares.signUpRules)(), _controllers.signUp);
router.post('/login', (0, _middlewares.loginRules)(), _controllers.signIn);
var _default = router;
exports["default"] = _default;