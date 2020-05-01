const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const createUser = async data => {
  return User.create(data);
};

const getUser = async id => await User.findOne({ _id: id });

const modifyUser = async (id, newUserData) => {
  return User.updateOne({_id: id}, newUserData);
};

const deleteUser = async id => {
  return User.deleteOne({ _id: id});
};

module.exports = { getAll, createUser, getUser, modifyUser, deleteUser };
