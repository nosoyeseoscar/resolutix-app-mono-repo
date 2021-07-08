const ERRROR_HANDLERS = {
  CastError: response =>
    response.status(400).send({ error: 'The Id is malformed!' }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: res =>
    res.status(401).json({
      error: 'invalid user or password'
    }),

  TokenExpirerError: res =>
    res.status(401).json({ error: 'token expired' }),

  defaultError: res =>
    res.status(500).end()
}


module.exports = (error, request, response, next) => {
  console.log(error)
  const handler = ERRROR_HANDLERS[error.name] || ERRROR_HANDLERS.defaultError
  handler(response, error)
}