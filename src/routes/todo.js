const express = require('express')
const controller = require('../controller/todo')

const router = express.Router()

router.post('/', controller.createTodo)
router.get('/:userId', controller.getTodo)
router.delete('/:todoId', controller.deleteTodo)
router.put('/:todoId', controller.updateTodo)
router.delete('/:todoId/:todoListId', controller.deleteListTodo)
router.put('/:todoId/:todoListId', controller.updateListTodo)
router.post('/todo-list', controller.createTodoList)

module.exports = router