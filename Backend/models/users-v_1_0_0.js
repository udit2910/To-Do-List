const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  password: {
    type: String,
  },
  user_id: {
    type: Number,
  },
  user_name: {
    type: String,
  },
});

usersSchema.plugin(global.db.autoIncrement, {
  model: 'users',
  field: 'user_id',
  startAt: 1
})

module.exports = mongoose.model('users', usersSchema);