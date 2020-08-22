const mongoose = require('mongoose');
const { Schema } = mongoose;

const todosSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  todo_id: {
    type: Number,
  },
  user_id: {
    type: Number,
  },
});

todosSchema.plugin(global.db.autoIncrement, {
  model: 'todos',
  field: 'todo_id',
  startAt: 1
})

module.exports = mongoose.model('todos', todosSchema);