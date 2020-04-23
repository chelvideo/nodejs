const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const createError = require('http-errors');

// GET /users - get all users (remove password from response)
router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(item => User.toResponse(item)));
  } catch (err) {
    next(err);
  }
});

// GET /users/:id - get the user by id (ex. “/users/123”) (remove password from response)
router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUser(id);
    if (user) res.status(200).json(User.toResponse(user));
    else throw new createError(404, 'User not found');
  } catch (err) {
    next(err);
  }
});

// POST /users - create user
router.route('/*').post(async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    usersService.createUser(newUser);
    res.status(200).json(User.toResponse(newUser));
  } catch (err) {
    next(err);
  }
});

// PUT /users/:id - update user
router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.modifyUser(id, req.body);
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

// DELETE /users/:id - delete user
router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDelete = await usersService.deleteUser(id);
    if (!isDelete) throw new createError(404, 'User not found');
    res.status(204).json('User is deleted');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
