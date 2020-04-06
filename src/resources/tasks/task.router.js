const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

// GET /:boardId/tasks - get all tasks by boardId
router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  // res.json(tasks.map(item => Task.toResponse(tasks)));
  res.json(tasks);
});
// GET /boards/:boardId/tasks/:taskId - get task by id on board with boardId
router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const task = await tasksService.getTask(boardId, taskId);
  if (task) res.json(task);
  else res.status(404).json({ error: 'Task not found' });
});

// POST /boards/:boardId/tasks - create new task on board with boardId
router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const newTask = new Task(req.body);
  newTask.boardId = boardId;
  await tasksService.createTask(newTask);
  res.json(newTask);
});

// PUT /boards/:boardId/tasks - update task with id on board with boardId
router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  const newTaskData = req.body;
  const task = await tasksService.modifyTask(boardId, taskId, newTaskData);
  res.json(task);
});

// DELETE /boards/:boardId/tasks/:taskId - delete task
router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.taskId;
  res.status(204).json(tasksService.deleteTask(boardId, taskId));
});

module.exports = router;
