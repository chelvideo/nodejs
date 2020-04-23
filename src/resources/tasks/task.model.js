const uuid = require('uuid');
let mongoose = require('mongoose');

var taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      default: uuid
    },
    boardId: {
      type: String,
      default: uuid
    },
    columnId: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false}
);

taskSchema.statics.toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return { id: _id, title, order, description, userId, boardId, columnId };
}

const Task = mongoose.model('Task', taskSchema);


module.exports = Task;
