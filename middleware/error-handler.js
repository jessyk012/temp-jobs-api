// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  };

  if(err.name === "ValidationError"){
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
    customError.statusCode = 400

  }

  if(err.name === "CastError") {
    customError.msg = `There is no job with that ID: ${err.value}`,
    customError.statusCode = 400
  }

  if(err.code && err.code === 11000 ) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please enter unique email`,
    customError.statusCode = 400
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg:customError.msg })

}

module.exports = errorHandlerMiddleware
