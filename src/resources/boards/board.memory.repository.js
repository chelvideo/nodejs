const dbBoards = [
  {
    id: 'test',
    title: 'board',
    columns: [
      {
        id: 'test1',
        title: 'col 1',
        order: 1
      },
      {
        id: 'test2',
        title: 'col 2',
        order: 2
      }
    ]
  }
];

const getAll = async () => {
  return dbBoards;
};

const createBoard = async data => {
  dbBoards.push(data);
};

const getBoard = async id => {
  return dbBoards.find(item => item.id === id);
};

const modifyBoard = async (id, newBoardData) => {
  const board = await getBoard(id);
  board.title = newBoardData.title;
  board.columns = newBoardData.columns;
  return board;
};

const deleteBoard = async id => {
  const index = dbBoards.findIndex(item => item.id === id);
  dbBoards.splice(index, 1);
  return dbBoards;
};

module.exports = { getAll, createBoard, getBoard, modifyBoard, deleteBoard };
