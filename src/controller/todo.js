const Todo = require('../models/todo')

async function createTodo(req, res) {
  try {
    // body {name, owner}
    const todo = new Todo(req.body)
    await todo.save()
    const newTodo = await Todo.findOne({_id: todo._id})

    res.status(201).json({
      success: true,
      message: 'Todo Created',
      data: newTodo
    })
  } catch(err) {
    res.status(500).json()
  }
}

async function createTodoList(req, res) {
  try {
    const { todoId, name } = req.body
    const todo = await Todo.findOne({ _id: todoId })
    if (todo) {
      todo.todoList.push({name})
      await todo.save()
      res.status(200).json({
        success: true,
        message: 'Todo list has been added',
        data: todo
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }

  } catch(err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error'
    })
  }
}

async function getTodo(req, res) {
  try {
    const {userId} = req.params
    const todos = await Todo.find({owner: userId})
    res.status(200).json({
      success: true,
      message: 'Todos retrieved',
      data: todos
    })
  } catch {
    res.status(500).json()
  }
}

async function deleteTodo(req, res) {
  try {
    const { todoId } = req.params
    const newTodo = await Todo.findByIdAndRemove({ _id: todoId}).exec()
    res.status(200).json({
      success: true,
      message: 'Todo has been deleted',
      data: newTodo,
    })
  } catch {
    res.status(500).json()
  }
}

async function updateTodo(req, res) {
  try {
    const { todoId } = req.params
    const { name } = req.body
    const newTodo = await Todo.findOneAndUpdate({ _id: todoId}, {name}, {new: true}).exec()
    res.status(200).json({
      success: true,
      message: 'Todo has been updated',
      data: newTodo
    })
  } catch  {
    res.status(500).json()
  }
}

async function deleteListTodo(req, res) {
  try {
    const { todoId, todoListId} = req.params
    const newTodo = await Todo.findByIdAndUpdate({_id: todoId}, {$pull: { todoList : { _id: todoListId}}}, {new: true}).exec()
    res.status(200).json({
      success: true,
      message: 'Todo list has been deleted',
      data: newTodo
    })
  } catch {
    res.status(500).json()
  }
}

async function updateListTodo(req, res) {
  try {
    const { todoId, todoListId} = req.params
    const { name } = req.body
    const newTodo = await Todo.findOneAndUpdate({
      _id: todoId, 'todoList._id': todoListId
    },{
      $set: {
        'todoList.$.name': name
      }
    },{
      new: true
    })
    res.status(200).json({
      success: true,
      message: 'Todo list has been updated',
      data: newTodo
    })
  } catch {
    res.status(500).json()
  }
}

async function updateStatusTodoList(req, res) {
  try {
    const {todoId, todoListId, isDone} = req.params
    const todo = await Todo.findOneAndUpdate({
      _id: todoId, 'todoList._id': todoListId
    }, {
      $set: {
        'todoList.$.isDone': isDone
      }
    }, {
      new: true
    })
    res.status(200).json({
      success: true,
      message: 'Todo list status has been updated',
      data: todo
    })
  }catch {
    res.status(500).json({
      success:false,
      message: 'Update todo status failed'
    })
  }
}

module.exports = {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
  deleteListTodo,
  updateListTodo,
  createTodoList,
  updateStatusTodoList
}