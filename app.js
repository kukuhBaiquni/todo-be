/* eslint-disable no-undef */
/* eslint-disable no-console */
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const compression = require('compression')
const helmet = require('helmet')
require('dotenv').config()

const app = express()
const {
  MONGO_CLOUD_PASSWORD, MONGO_CLUSTER, NODE_ENV,
} = process.env

const mongoCloud = `mongodb+srv://kukuhbaiquni:${MONGO_CLOUD_PASSWORD}@${MONGO_CLUSTER}.wk0hoc3.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(
  NODE_ENV === 'DEV~' ? 'mongodb://127.0.0.1:27017/qunicode' : mongoCloud,
  { useNewUrlParser: true, useUnifiedTopology: true },
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to MongoDB database')
})

// Config
app.use(compression())
app.use(helmet())
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

app.use('/auth', require('./src/routes/auth'))
app.use('/todo', require('./src/routes/todo'))

module.exports = app