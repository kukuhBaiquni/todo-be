const Todo = require('../models/todo')

async function createTodo(req, res) {
  try {
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

async function getTodo(req, res) {
  try {
    const newTodo = await Todo.find({})
    res.status(200).json({
      data: newTodo
    })
  } catch {
    res.status(500).json()
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params
    const newTodo = await Todo.findByIdAndRemove({ _id: id}).exec()
    res.status(200).json({
      success: true,
      message: 'Item has been deleted',
      item: newTodo,
    })
  } catch {
    res.status(500).json()
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params
    const { name } = req.body
    const newTodo = await Todo.findOneAndUpdate({ _id: id}, {name}, {new: true}).exec()
    res.status(200).json({
      success: true,
      message: 'Item has been updated',
      item: newTodo
    })
  } catch  {
    res.status(500).json()
  }
}

async function deleteListTodo(req, res) {
  try {
    const { nameId, listId} = req.params
    const newTodo = await Todo.findByIdAndUpdate({_id: nameId}, {$pull: { todoList : { _id: listId}}}, {new: true}).exec()
    res.status(200).json({
      success: true,
      message: 'Item has been deleted',
      item: newTodo
    })
  } catch {
    res.status(500).json()
  }
}

async function updateListTodo(req, res) {
  try {
    const { nameId, listId} = req.params
    const { name } = req.body
    const newTodo = await Todo.findOneAndUpdate({
      _id: nameId, 'todoList._id': listId
    },{
      $set: {
        'todoList.$.name': name
      }
    },{
      new: true
    })
    res.status(200).json({
      success: true,
      message: 'Item has been updated',
      item: newTodo
    })
  } catch {
    res.status(500).json()
  }
}

module.exports = {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
  deleteListTodo,
  updateListTodo
}