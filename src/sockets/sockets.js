'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(io) {
  io.on('connection', function (socket) {
    // console.log('New user connected!');
    socket.on('client:openProject', function (projectId) {
      socket.join(projectId); // 1 room x c/project
    }); // Tasks

    socket.on('client:createTask', function (newTask) {
      var project = newTask.project;
      socket.to(project).emit('server:addedTask', newTask); // Solo a los del mismo project/room
    });
    socket.on('client:deleteTask', function (deletedTask) {
      var project = deletedTask.project;
      socket.to(project).emit('server:deletedTask', deletedTask);
    });
    socket.on('client:editTask', function (updatedTask) {
      var project = updatedTask.project;
      socket.to(project).emit('server:updatedTask', updatedTask);
    });
    socket.on('client:toggleTaskState', function (updatedTaskState) {
      var project = updatedTaskState === null || updatedTaskState === void 0 ? void 0 : updatedTaskState.project._id;
      socket.to(project).emit('server:updatedTaskState', updatedTaskState);
    });
  });
};

exports["default"] = _default;