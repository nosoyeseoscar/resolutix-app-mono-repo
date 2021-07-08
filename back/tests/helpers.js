const { app } = require('../index')// importamos la app y el server a testear.
const supertest = require('supertest') // biblioteca adaptar server http o microservicios para test.
const api = supertest(app)
const User = require('../models/User')
const Docto = require('../models/Doc')
// const bcrypt = require('bcrypt')

// notas iniciales para control

const initialDoctos = [
  {
    numOf: '01.01.01',
    promovente: 'Primero',
    tipo: 'resolutivo'
  },
  {
    numOf: '01.01.02',
    promovente: 'Segundo',
    tipo: 'resolutivo'
  }
]

const initialUsers = [
  {
    userName: 'prueba1',
    name: 'Usuario de prueba 1',
    passwordHash: '1234',
    doctos: []
  },
  {
    userName: 'prueba2',
    name: 'Usuario de prueba 2',
    passwordHash: '5678',
    doctos: []
  }
]

const getAllPromoventsFromDoctos = async () => {
  const response = await api.get('/api/documents')
  return {
    promoventes: response.body.map(docto => docto.promovente),
    response
  }
}

const getUsers = async () => {
  const usersBD = await User.find({})
  return usersBD.map(user => user.toJSON())
}

const baseDataReset = async () => {
  await Docto.deleteMany({}) // borramos todas las notas
  await User.deleteMany({})
  // parallel
  /* const doctosObjects = initialDoctos.map(docto => new Docto(docto))
    const promises = doctosObjects.map(docto => docto.save())
    await Promise.all(promises) */
  // sequencial
  for (const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }

  const usersBD = await getUsers()

  for (const docto of initialDoctos) {
    docto.user = usersBD[0].id
    const doctoObject = new Docto(docto)
    await doctoObject.save()
  }
}

module.exports = {
  getAllPromoventsFromDoctos,
  api,
  initialDoctos,
  initialUsers,
  getUsers,
  baseDataReset
}
