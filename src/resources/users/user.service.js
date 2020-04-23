const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();
const createUser = data => usersRepo.createUser(data);
const getUser = id => usersRepo.getUser(id);
const modifyUser = (id, newUserData) => usersRepo.modifyUser(id, newUserData);
const deleteUser = async id => {
  
  await tasksRepo.deleteUserFromTasks(id);
  return (await usersRepo.deleteUser(id)).deletedCount;
};

module.exports = { getAll, createUser, getUser, modifyUser, deleteUser };