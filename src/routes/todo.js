const express = require('express')
const controller = require('../controller/todo')

const router = express.Router()

router.post('/', controller.createTodo)
router.get('/:id', controller.getTodo)
router.delete('/:id', controller.deleteTodo)
router.put('/:id', controller.updateTodo)
router.delete('/:todoId/:todoListId', controller.deleteListTodo)
router.put('/:todoId/:todoListId', controller.updateListTodo)
router.post('/todo-list', controller.createTodoList)

module.exports = router