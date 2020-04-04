const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

// GET /boards - get all boards
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(item => Board.toResponse(item)));
});

// GET /boards/:id - get the user by id (ex. “/boards/123”) (remove password from response)
router.route('/*').get(async (req, res) => {
  const board = await boardsService.getBoard(req.path.slice(1));
  if (board) res.json(Board.toResponse(board));
  else res.status(404).json({ error: 'Board not found' });
  res.json(Board.toResponse());
});

// POST /boards - create board
router.route('/*').post(async (req, res) => {
  const newBoard = new Board(req.body);
  boardsService.createBoard(newBoard);
  res.json(Board.toResponse(newBoard));
});

// PUT /boards/:id - update board
router.route('/*').put(async (req, res) => {
  const board = await boardsService.modifyBoard(req.path.slice(1), req.body);
  res.json(Board.toResponse(board));
});

// DELETE /boards/:id - delete board
router.route('/*').delete(async (req, res) => {
  const boardId = req.path.slice(1);
  res.status(204).json(boardsService.deleteBoard(boardId));
});

module.exports = router;
