const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

// GET /users - get all users (remove password from response)
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(item => User.toResponse(item)));
});

// GET /users/:id - get the user by id (ex. “/users/123”) (remove password from response)
router.route('/*').get(async (req, res) => {
  const user = await usersService.getUser(req.path.slice(1));
  if (user) res.json(User.toResponse(user));
  else res.status(404).json({ error: 'User not found' });
  // res.json(User.toResponse());
});

// POST /users - create user
router.route('/*').post(async (req, res) => {
  const newUser = new User(req.body);
  usersService.createUser(newUser);
  res.json(User.toResponse(newUser));
});

// PUT /users/:id - update user
router.route('/*').put(async (req, res) => {
  const user = await usersService.modifyUser(req.path.slice(1), req.body);
  res.json(User.toResponse(user));
});

// DELETE /users/:id - delete user
router.route('/*').delete(async (req, res) => {
  const userId = req.path.slice(1);
  res.status(204).json(usersService.deleteUser(userId));
});

module.exports = router;
