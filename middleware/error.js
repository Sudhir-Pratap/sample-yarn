const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message
  console.log(err);
  // console.log(err.stack.red)

  if (err.name === 'CastError') {
    const message = `Resource not found with ID of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose Duplicate Error
  if (err.code === 11000) {
    const message = `Duplicate Values entered: '${err.keyValue.name}\'`
    error = new ErrorResponse(message, 400)
  }

  // MONGOOSE Validation
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message,400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  })
}

module.exports = errorHandler
