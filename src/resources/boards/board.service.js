const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();
const createBoard = data => boardsRepo.createBoard(data);
const getBoard = id => boardsRepo.getBoard(id);
const modifyBoard = (id, newBoardData) =>
  boardsRepo.modifyBoard(id, newBoardData);
const deleteBoard = id => {
  boardsRepo.deleteBoard(id);
  tasksRepo.deleteTasksFromBoard(id);
};

module.exports = { getAll, createBoard, getBoard, modifyBoard, deleteBoard };
