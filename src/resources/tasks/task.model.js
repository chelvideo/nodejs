const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TITLE',
    order = 1,
    description = 'test task',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { title, order, description, userId, boardId, columnId } = task;
    return { title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
