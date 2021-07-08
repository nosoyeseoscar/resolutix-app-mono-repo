//requerimos Schema y Model de mongoose
const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    doctos: [{
        type: Schema.Types.ObjectId,
        ref: 'Docto' //referencia al modelo Docto
    }]
})

//cambiamos el toJson para que el formato quede legible para el front
userSchema.set('toJSON', {
    transform: (user, returnedObject) => {
        returnedObject.id = returnedObject._id
        //mala practica usar delete, pero aqui no muta info
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash //no devuelva el password
    }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User