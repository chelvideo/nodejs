const db = [
  {
    id: 'test',
    name: 'mytest',
    login: 'mytest',
    password: 'mytest'
  }
];

const getAll = async () => {
  return db;
};

const createUser = async data => {
  db.push(data);
};

const getUser = async id => {
  return db.find(item => item.id === id);
};

const modifyUser = async (id, newUserData) => {
  const user = await getUser(id);
  user.name = newUserData.name;
  user.login = newUserData.login;
  user.password = newUserData.password;
  return user;
};

const deleteUser = async id => {
  const index = db.findIndex(item => item.id === id);
  db.splice(index, 1);
};

module.exports = { getAll, createUser, getUser, modifyUser, deleteUser };
