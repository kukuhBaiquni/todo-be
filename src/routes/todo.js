const express = require('express')
const controller = require('../controller/todo')

const router = express.Router()

router.post('/create', controller.createTodo)
router.get('/', controller.getTodo)
router.delete('/:id', controller.deleteTodo)
router.put('/:id', controller.updateTodo)
router.delete('/:nameId/todolist/:listId', controller.deleteListTodo)
router.put('/:nameId/todolist/:listId', controller.updateListTodo)
router.post('/create/todo-list', controller.createTodoList)

module.exports = router