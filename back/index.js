require('dotenv').config()// usamos dotnev para cargar configuraciones .env
require('./mongo')// requerimos el codigo que hace la conexion

// middleware
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

// controllers
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const doctosRouter = require('./controllers/doctos')

const express = require('express')
const cors = require('cors')// evita problemas de origenes CORS
const app = express()

// importamos el modelo para hacer uso del modelo mongoose
/* const Docto = require('./models/Doc')
const User = require('./models/User') */

app.use(express.json()) // habilitamos el parser de express para Json y poder enviar json al cliente.
app.use(cors())// habilitamos cualquier origen.
/* app.use('/images', express.static('images')) */// servir estaticos (imagenes) desde express
app.use(express.static('../front/build')) // servidor estaticos de la app desde el server

// ruta Home
/* app.get('/', (request, response) => {
  response.send('<h1>Hello World<h1>')
}) */

/* ruta que recupera todos los documentos, refactorizada para usar async/await, ruta para crear un recurso en el servidor. refactorizado usando async-await */
app.use('/api/documents', doctosRouter)

// ruta recuperar documento unico
app.use('/api/documents/:id', doctosRouter)

// ruta para editar un documento.
app.use('/api/documents/:id', doctosRouter)

// ruta para usuarios
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// ruta para pruebas
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  console.log('Modo Testing')
  app.use('/api/testing', testingRouter)
}

// ruta de error
app.use(handleErrors)

app.use(notFound)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
