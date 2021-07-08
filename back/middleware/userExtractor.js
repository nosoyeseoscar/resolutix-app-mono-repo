const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  // recuperamos la cabecera Autorization usando la forma de Express
  const authorization = request.get('authorization')
  let token = null

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)// recuperamos el token de la cabecera athorization
    // decodificamos el token
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token is missing or invalid'
    })
  }

  const { id: userId } = decodedToken
  request.userId = userId // agregamos user id a la informacion de la request para ser usada despues

  next()
}
