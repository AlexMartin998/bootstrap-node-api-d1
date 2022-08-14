'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _express = require("express");

var _middlewares = require("../middlewares");

var _controllers = require("../controllers");

var router = (0, _express.Router)();
router.post('/', [_middlewares.protectWithJwt].concat((0, _toConsumableArray2["default"])((0, _middlewares.getUserByEmailRules)())), _controllers.getUserByEmail);
router.get('/confirm/:token', _middlewares.checkToken, _controllers.confirmUser);
router.post('/recovery-token', (0, _middlewares.genRecoveryTokenRules)(), _controllers.genRecoveryToken);
router.route('/password-recovery/:token').get(_middlewares.checkToken, _controllers.validateToken).post((0, _middlewares.genNewPasswordRules)(), _controllers.genNewPassword); // Private

router.get('/profile', _middlewares.protectWithJwt, _controllers.isAuthenticated);
var _default = router;
exports["default"] = _default;