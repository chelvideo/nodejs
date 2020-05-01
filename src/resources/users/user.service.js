const bcrypt = require('bcrypt');
const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const saltRounds = 10;

const getAll = () => usersRepo.getAll();
//const createUser = data => usersRepo.createUser(data);

const createUser = async userData => {
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds); 
  userData.password = hashedPassword;
  return usersRepo.createUser(userData);
};

const getUser = id => usersRepo.getUser(id);
const modifyUser = (id, newUserData) => usersRepo.modifyUser(id, newUserData);
const deleteUser = async id => {
  
  await tasksRepo.deleteUserFromTasks(id);
  return (await usersRepo.deleteUser(id)).deletedCount;
};

module.exports = { getAll, createUser, getUser, modifyUser, deleteUser };