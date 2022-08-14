'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_req, res) {
  return res.status(404).send({
    status: 404,
    message: 'Resource not found!'
  });
};

exports["default"] = _default;