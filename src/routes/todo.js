const express = require('express')
const controller = require('../controller/todo')

const router = express.Router()

router.post('/create', controller.createTodo)
router.get('/:id', controller.getTodo)
router.delete('/:id', controller.deleteTodo)
router.put('/:id', controller.updateTodo)
router.delete('/:todoId/todolist/:todoListId', controller.deleteListTodo)
router.put('/:todoId/todolist/:todoListId', controller.updateListTodo)
router.post('/create/todo-list', controller.createTodoList)

module.exports = router