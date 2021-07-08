// usamos mongoose, declaramos la conexion.
const mongoose = require('mongoose')
// const passDB = require('./password')

// nombre de base de datos
// const dataBaseName = 'documentosDB'

// extraemos todas las variables de entorno que usaremos
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

// const connectionString = `mongodb+srv://test-user:${passDB}@cluster0.5yemr.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

// conexion a mongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.log(`DataBase connected! in mode ${NODE_ENV}`)
  }).catch(err => {
    console.error(err)
  })

// buena practica de cerrar conexion cuando ha habido un problema
process.on('uncaughtException', () => {
  mongoose.disconnect()
})

/* Para comprobar que se grabo informacion */
/* Docto.find({}).then( result=>{
    console.log(result)
    mongoose.connection.close()
}).catch(err=>{
    console.error(err)
}) */
// creamos instancia de la nota
/* const docto = new Docto({
    numOf: '02.02.004',
    promovente: 'Guillermo',
    tipo: 'resolutivo'
})

docto.save()
    .then( result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch( err =>{
        console.error(err)
    }) */
