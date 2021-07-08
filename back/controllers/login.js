const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
    const { body } = request
    const { userName, password } = body
    //console.log(body)
    const user = await User.findOne({ userName })
    //console.log(user);
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        response.status(401).json({
            error: 'invalid user or password'
        })
    }

    //informacion del usuario requerida para firmar y crear el token
    const userForToken = {
        id: user._id,
        userName: user.userName
    }

    //creamos y firmamos el token
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })


    response.send({
        name: user.name,
        userName: user.userName,
        token
    })
})

module.exports = loginRouter