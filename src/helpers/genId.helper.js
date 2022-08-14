'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genId = void 0;

var genId = function genId() {
  return (performance.now().toString(32) + Math.random().toString(32).substring(2) + Date.now().toString(32)).replace('.', '');
};

exports.genId = genId;