const mongoose = require('mongoose')
const { server } = require('../index')// importamos la app y el server a testear.
const Docto = require('../models/Doc') // esquema de la nota para manipular la base de datos
const User = require('../models/User')

const {
  getAllPromoventsFromDoctos,
  api,
  initialDoctos,
  baseDataReset
} = require('./helpers')

/* cada vez que se hace un test, meter los documentos iniciales
para tener control a la base de datos sin importar el estado anterior de la misma */

// hook para hacer algo antes de cada test
beforeEach(async () => {
  /* await Docto.deleteMany({}) //borramos todas las notas
    await User.deleteMany({})
    //parallel
    /* const doctosObjects = initialDoctos.map(docto => new Docto(docto))
    const promises = doctosObjects.map(docto => docto.save())
    await Promise.all(promises) */
  // sequencial
  /* for (const user of initialUsers) {
        const userObject = new User(user)
        await userObject.save()
    }

    const usersBD = await getUsers()

    for (const docto of initialDoctos) {
        docto.user = usersBD[0].id
        const doctoObject = new Docto(docto)
        await doctoObject.save()
    } */
  await baseDataReset()
})

test('first docto is Primero', async () => {
  const { promoventes } = await getAllPromoventsFromDoctos()
  /* const response = await api.get('/api/documents')
    const promoventes = response.body.map(docto => docto.promovente) */
  expect(promoventes[0]).toContain(initialDoctos[0].promovente)
})

describe('POST documents on BD', () => {
  test('a valid docto can be added', async () => {
    const usersBD = await User.find({})

    const newDocto = {
      numOf: '00.00.00',
      promovente: 'Ejemplo de Docto',
      tipo: 'resolutivo',
      userId: usersBD[0]._id // id del primer usuario de prueba
    }

    await api
      .post('/api/documents')
      .send(newDocto)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { promoventes, response } = await getAllPromoventsFromDoctos()

    expect(response.body).toHaveLength(initialDoctos.length + 1)
    expect(promoventes).toContain(newDocto.promovente)
  })

  test('docto without a Num_Of is not added', async () => {
    const newDocto = {
      promovente: 'Ejemplo de Docto',
      tipo: 'resolutivo'
    }

    await api
      .post('/api/documents')
      .send(newDocto)
      .expect(400)

    const response = await api.get('/api/documents')

    expect(response.body).toHaveLength(initialDoctos.length)
  })
})

describe('DELETE documents on BD', () => {
  test('a docto can be delete', async () => {
    const { response: firstResponse } = await getAllPromoventsFromDoctos()
    const { body: doctos } = firstResponse // sacamos la respuesta del helper y le cambiamos el nombre
    const [doctoToDelete] = doctos // seleccionamos el primer elemento de los doctos disponibles

    await api
      .delete(`/api/documents/${doctoToDelete.id}`)
      .expect(204)

    const { promoventes, response: secondResponse } = await getAllPromoventsFromDoctos()
    expect(secondResponse.body).toHaveLength(initialDoctos.length - 1)
    expect(promoventes).not.toContain(doctoToDelete.promovente)
  })

  test('a docto that doesnt exist can not be delete', async () => {
    await api
      .delete('/api/documents/1234')
      .expect(400)

    const { response } = await getAllPromoventsFromDoctos()
    expect(response.body).toHaveLength(initialDoctos.length)
  })
})

describe('GET documents on BD', () => {
  test('There is not documents on BD', async () => {
    await Docto.deleteMany({})
    const { response } = getAllPromoventsFromDoctos()
    expect(response).toBe(undefined)
  })

  test(`There are ${initialDoctos.length} doctos`, async () => {
    const response = await api.get('/api/documents')
    expect(response.body).toHaveLength(initialDoctos.length)
  })

  test('docs are returned as JSON', async () => {
    await api
      .get('/api/documents')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Docto not found cant be returned', async () => {
    await api
      .get('/api/documents/123456')
      .expect(400)
  })
})

describe('PUT documents on BD', () => {
  test('a docto can be modified', async () => {
    const { response: firstResponse } = await getAllPromoventsFromDoctos()
    const { body: doctos } = firstResponse // sacamos la respuesta del helper y le cambiamos el nombre
    const [doctoToModify] = doctos // seleccionamos el documento a modificar, el primero aqui
    const dataModify = 'Modificado' // simulamos un dato modificado.

    await api
      .put(`/api/documents/${doctoToModify.id}`)
      .send({ promovente: dataModify })// enviamos campo a modificar
      .expect(200)

    const { promoventes } = await getAllPromoventsFromDoctos()
    expect(promoventes).toContain(dataModify)
  })

  test('a docto that doesnt exist can not be modified', async () => {
    await api
      .put('/api/documents/1234')
      .send({ promovente: 'Modificado' })
      .expect(400)
  })
})

// hook del test
afterAll(() => {
  mongoose.connection.close()
  server.close()
})
