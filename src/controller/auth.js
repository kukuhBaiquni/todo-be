const User = require('../models/user')
const rules = require('../constants/model-rules')
const jwt = require('jsonwebtoken')

async function register(req, res) {

  try {
    const { name } = req.body
    if (name.length < rules.USER_NAME_MIN_LENGTH) {
      res.status(422).json({
        success: false,
        message: '"name" must be greater than or equal to 3'
      })
    }

    const duplicate = await User.findOne({ name })
    if (duplicate) {
      res.status(409).json({
        success: false,
        message: 'Name already exist',
      })
    } else {
      const user = new User(req.body)
      await user.save()
      const newUser = await User.findOne({ _id: user._id })

      res.status(201).json({
        success: true,
        message: 'User created',
        data: newUser
      })
    }


  } catch (err) {
    res.status(500).json()
  }


}

async function createUser(req, res) {

  try {
    const { email, password } = req.body;
    const token = jwt.sign({ email, password }, 'secret')
    res.status(200).json({
      success: true,
      message: 'User created',
      accessToken: token
    })
  } catch (err) {
    res.status(500).json()
  }
}

module.exports = {
  register,
  createUser
}