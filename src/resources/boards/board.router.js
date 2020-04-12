const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const createError = require('http-errors');

// GET /boards - get all boards
router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(item => Board.toResponse(item)));
  } catch (err) {
      next(err);
  }
});

// GET /boards/:id - get the user by id (ex. “/boards/123”) (remove password from response)
router.route('/:boardId').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await boardsService.getBoard(boardId);
    if (board) res.status(200).json(Board.toResponse(board));
    else throw new createError(404, 'Board not found');
  } catch (err) {
      next(err);
  }
});

// POST /boards - create board
router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = new Board(req.body);
    boardsService.createBoard(newBoard);
    res.status(200).json(Board.toResponse(newBoard));
  } catch (err) {
      next(err);
  }
});

// PUT /boards/:id - update board
router.route('/:boardId').put(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await boardsService.modifyBoard(boardId, req.body);
    res.status(200).json(Board.toResponse(board));
  } catch (err) {
      next(err);
  }
});

// DELETE /boards/:id - delete board
router.route('/:boardId').delete(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    res.status(204).json(boardsService.deleteBoard(boardId));
  } catch (err) {
      next(err);
  }
});

router.use('/', taskRouter);

module.exports = router;
