const mongoose = require('mongoose')
const rules = require('../constants/model-rules')

const { Schema } = mongoose

const user = new Schema({
  name: {
    default: 'user',
    type: String,
    required: true,
    minLength: rules.USER_NAME_MIN_LENGTH,
    maxLength: rules.USER_NAME_MAX_LENGTH
  },
  email: String,
  password: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', user)