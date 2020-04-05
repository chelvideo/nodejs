const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');

// GET /boards - get all boards
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(item => Board.toResponse(item)));
});

// GET /boards/:id - get the user by id (ex. “/boards/123”) (remove password from response)
router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params;
  const board = await boardsService.getBoard(boardId);
  if (board) res.json(Board.toResponse(board));
  else res.status(404).json({ error: 'Board not found' });
  res.json(Board.toResponse());
});

// POST /boards - create board
router.route('/').post(async (req, res) => {
  const newBoard = new Board(req.body);
  boardsService.createBoard(newBoard);
  res.json(Board.toResponse(newBoard));
});

// PUT /boards/:id - update board
router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;
  const board = await boardsService.modifyBoard(boardId, req.body);
  res.json(Board.toResponse(board));
});

// DELETE /boards/:id - delete board
router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params;
  res.status(204).json(boardsService.deleteBoard(boardId));
});

router.use('/', taskRouter);

module.exports = router;
