'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ProjectSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required!'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    trim: true
  },
  deliveryDate: {
    type: Date,
    "default": Date.now()
  },
  client: {
    type: String,
    required: [true, 'Client is required!'],
    trim: true
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tasks: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  collaborators: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Project', ProjectSchema);

exports["default"] = _default;