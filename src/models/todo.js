const mongoose = require('mongoose')
const rules = require('../constants/model-rules')

const {Schema} = mongoose

const todo = new Schema({
  name: {
    type: String,
    required: true,
    minLength: rules.TODO_NAME_MIN_LENGTH,
    maxLength: rules.TODO_NAME_MAX_LENGTH
  },
  todoList: [{
    name: {
      type: String,
      required: true,
      minLength: rules.TODO_LIST_NAME_MIN_LENGTH,
      maxLength: rules.TODO_LIST_NAME_MAX_LENGTH
    },
    isDone: {
      type: Boolean,
      default: false,
    }
  }],
  owner: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Todo', todo)