import { type NextFunction, type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { NODE_ENV } from '../config/environment'
import ApiError from '../utils/ApiError'

export const errorConverter = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = StatusCodes.BAD_REQUEST
    const message = error.message ?? StatusCodes[statusCode]
    error = new ApiError(statusCode, message)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { statusCode, message } = err
  if (NODE_ENV === 'production') {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    message = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack })
  }

  res.status(statusCode).send(response)
}
