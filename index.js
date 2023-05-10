/* eslint-disable no-undef */
const http = require('http')
const app = require('./app')

const server = http.createServer(app)

// run server
server.listen(process.env.PORT)