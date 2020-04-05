let dbTasks = [
  {
    id: 'test',
    title: 'task',
    order: '0',
    description: 'test task',
    userId: 'test',
    boardId: 'test',
    columnId: 'test'
  },
  {
    id: 'test2',
    title: 'task2',
    order: '0',
    description: 'test task',
    userId: 'test',
    boardId: 'test',
    columnId: 'test2'
  }
];

const getAll = async boardId => {
  return await dbTasks.filter(item => item.boardId === boardId);
};

const createTask = async data => {
  dbTasks.push(data);
};

const getTask = async (boardId, taskId) => {
  return dbTasks.find(item => item.id === taskId && item.boardId === boardId);
};

const modifyTask = async (boardId, taskId, newTaskData) => {
  const task = await getTask(boardId, taskId);
  task.title = newTaskData.title;
  task.order = newTaskData.order;
  task.description = newTaskData.description;
  task.userId = newTaskData.userId;
  task.boardId = newTaskData.boardId;
  task.columnId = newTaskData.columnId;
  return task;
};

const deleteTask = async (boardId, taskId) => {
  const index = dbTasks.findIndex(
    item => item.id === taskId && item.boardId === boardId
  );
  dbTasks.splice(index, 1);
};

const deleteUserFromTasks = async id => {
  dbTasks.forEach(item => {
    if (item.userId === id) item.userId = null;
  });
};

const deleteTasksFromBoard = async id => {
  dbTasks = dbTasks.filter(item => item.boardId !== id);
};

module.exports = {
  getAll,
  createTask,
  getTask,
  modifyTask,
  deleteTask,
  deleteUserFromTasks,
  deleteTasksFromBoard
};
