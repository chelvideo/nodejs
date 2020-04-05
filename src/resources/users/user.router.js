const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

// GET /users - get all users (remove password from response)
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(item => User.toResponse(item)));
});

// GET /users/:id - get the user by id (ex. “/users/123”) (remove password from response)
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUser(id);
  if (user) res.json(User.toResponse(user));
  else res.status(404).json({ error: 'User not found' });
});

// POST /users - create user
router.route('/*').post(async (req, res) => {
  const newUser = new User(req.body);
  usersService.createUser(newUser);
  res.json(User.toResponse(newUser));
});

// PUT /users/:id - update user
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.modifyUser(id, req.body);
  res.json(User.toResponse(user));
});

// DELETE /users/:id - delete user
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  res.status(204).json(usersService.deleteUser(id));
});

module.exports = router;
