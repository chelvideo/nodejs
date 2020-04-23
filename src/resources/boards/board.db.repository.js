const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const createBoard = async data => {
  return Board.create(data);  
};

const getBoard = async id => {
  return Board.findOne({ _id: id});
};

const modifyBoard = async (id, newBoardData) => {
  const boardToDB = Board.toDB(newBoardData);
  const board = await Board.findOneAndUpdate({ _id: id }, boardToDB, { new: true }).exec();
  return board;
};

const deleteBoard = async id => {
  return Board.deleteOne({ _id: id});
};

module.exports = { getAll, createBoard, getBoard, modifyBoard, deleteBoard };
