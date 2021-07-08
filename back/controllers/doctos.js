const doctosRouter = require('express').Router()
const Docto = require('../models/Doc')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const userExtractor = require('../middleware/userExtractor')

/* ruta que recupera todos los documentos, refactorizada para usar async/await */
doctosRouter.get('/', async (request, response) => {

    const doctos = await Docto.find({}).populate('user', {
        userName: 1,
        name: 1
    })

    response.json(doctos)

})

doctosRouter.get('/:id', async (request, response, next) => {
    const { id } = request.params
    try {
        const docto = await Docto.findById(id).populate('doctos', {
            numOf: 1,
            promovente: 1,
            tipo: 1
        })
        if (docto) {
            return response.json(docto)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

doctosRouter.put('/:id', userExtractor, async (request, response, next) => {
    const { id } = request.params
    const { numOf, promovente, tipo } = request.body

    const newDoctoInfo = {
        numOf: numOf,
        promovente: promovente,
        tipo: tipo
    }

    try {
        const updatedDocto = await Docto.findByIdAndUpdate(id, newDoctoInfo, { new: true })
        response.json(updatedDocto)
    } catch (error) {
        next(error)
    }

})

doctosRouter.delete('/:id', userExtractor, async (request, response, next) => {
    const { id } = request.params
    try {
        await Docto.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

doctosRouter.post('/', userExtractor, async (request, response, next) => {
    const {
        numOf,
        promovente,
        tipo,

    } = request.body //sacamos el docto de la request\

    const { userId } = request
    const user = await User.findById(userId) //recuperamos el usuario que hizo la nota de la BD

    // en caso de que este vacio o sin algun campo dar error.
    if (!promovente || !numOf) {
        return response.status(400).json({
            error: 'Necesary content required'
        })
    }

    const newDocto = new Docto({
        numOf,
        promovente,
        tipo,
        user: user._id
    })

    try {
        const savedDocto = await newDocto.save()
        user.doctos = user.doctos.concat(savedDocto._id)//agregamos la nota creada al usuario
        await user.save()

        response.status(201).json(savedDocto)
    } catch (error) {
        next(error)
    }
})

module.exports = doctosRouter