'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var TaskSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name is required!'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Task description is required!'],
    trim: true
  },
  state: {
    type: Boolean,
    "default": false
  },
  deliveryDate: {
    type: Date,
    required: [true, 'Delivery date is required!'],
    "default": Date.now()
  },
  priority: {
    type: String,
    required: [true, 'Priority is required!'],
    "enum": ['Baja', 'Media', 'Alta']
  },
  project: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  completedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    "default": null
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Task', TaskSchema);

exports["default"] = _default;