const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = [
      {
        id: 'test1',
        title: 'col 1',
        order: 1
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
