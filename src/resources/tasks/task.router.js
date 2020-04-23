const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const createError = require('http-errors');

// GET /:boardId/tasks - get all tasks by boardId
router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  } catch (err) {
    next(err);
  }
});

// GET /boards/:boardId/tasks/:taskId - get task by id on board with boardId
router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    let {boardId, taskId} = req.params;
    const task = await tasksService.getTask(boardId, taskId);
    if (task) res.status(200).json(Task.toResponse(task))
    else throw new createError(404, 'Task not found');
  } catch (err) {
      next(err);
  }
});

// POST /boards/:boardId/tasks - create new task on board with boardId
router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const newTaskData = req.body;
    const newTask = await tasksService.createTask({ ...newTaskData, boardId });
    return res.status(200).json(Task.toResponse(newTask));
  } catch (err) {
      next(err);
  }
});

// PUT /boards/:boardId/tasks - update task with id on board with boardId
router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const newTaskData = req.body;
    const task = await tasksService.modifyTask(boardId, taskId, newTaskData);
    res.status(200).json(task);
  } catch (err) {
      next(err);
  }
});

// DELETE /boards/:boardId/tasks/:taskId - delete task
router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    res.status(204).json(tasksService.deleteTask(boardId, taskId));
  } catch (err) {
      next(err);
  }
});

module.exports = router;
