let mongoose = require('mongoose');
const uuid = require('uuid');

var boardSchema = new mongoose.Schema(
  {
    title: String,
    _id: {
      type: String,
      default: uuid
    },
    columns: [
      {
        _id: {
          type: String,
          default: uuid
        },
        title: String,
        order: Number
      }
    ]
  },
  { versionKey: false}
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  const filterColumns = columns.map(item => ({
    id: item._id,
    title: item.title,
    order: item.order
  }));
  return { id: _id, title, columns: filterColumns };
}

boardSchema.statics.toDB = board => {
  const { id, title, columns } = board;
  const filterColumns = columns.map(column => ({
    _id: column.id,
    title: column.title,
    order: column.order
  }));
  return { _id: id, title, columns: filterColumns };
}

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
