import express from 'express'
import cors from 'cors'
import { StatusCodes } from 'http-status-codes'

import ApiError from './utils/ApiError'
import { router as routes } from './api/index'
import { errorConverter, errorHandler } from './middlewares/error'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
