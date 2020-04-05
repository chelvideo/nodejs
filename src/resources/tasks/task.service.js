const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const createTask = data => tasksRepo.createTask(data);
const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);
const modifyTask = (boardId, taskId, newTaskData) =>
  tasksRepo.modifyTask(boardId, taskId, newTaskData);
const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = { getAll, createTask, getTask, modifyTask, deleteTask };
