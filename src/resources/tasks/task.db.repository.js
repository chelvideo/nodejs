const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({boardId});
};

const createTask = async data => {
  const resp = Task.create(data);
  return resp; 
};

const getTask = async (boardId, taskId) => {
  return Task.findOne({_id: taskId, boardId});
};

const modifyTask = async (boardId, taskId, newTaskData) => {
  return Task.updateOne({_id: taskId, boardId}, newTaskData);
};

const deleteTask = async (boardId, taskId) => {
  return Task.deleteOne({_id: taskId, boardId: boardId});
};

const deleteUserFromTasks = async userId => {
  return await Task.updateMany({ userId }, { $set: { userId: null } }).exec();
};

const deleteTasksFromBoard = async boardId => {
  await Task.deleteMany({ boardId });
};

module.exports = {
  getAll,
  createTask,
  getTask,
  modifyTask,
  deleteTask,
  deleteUserFromTasks,
  deleteTasksFromBoard
};
