const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const createUser = data => usersRepo.createUser(data);
const getUser = id => usersRepo.getUser(id);
const modifyUser = (id, newUserData) => usersRepo.modifyUser(id, newUserData);
const deleteUser = id => {
  usersRepo.deleteUser(id);
  tasksRepo.deleteUserFromTasks(id);
};

module.exports = { getAll, createUser, getUser, modifyUser, deleteUser };
