const testingRouter = require('express').Router()
const Docto = require('../models/Doc')
const User = require('../models/User')

testingRouter.post('/reset', async (request, response) => {
  await Docto.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
