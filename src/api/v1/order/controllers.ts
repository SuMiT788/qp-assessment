import { type NextFunction, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

import { insertOrder } from './services'
import ApiError from '../../../utils/ApiError'
import { type IGetUserAuthInfoRequest } from '../../../utils/interfaces'
import { getUserById } from '../user/services'

export const addOrder = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const groceryItemSchema = Joi.object({
      id: Joi.number().required(),
      amount: Joi.number().required()
    })

    const schema = Joi.object({
      groceryList: Joi.array().items(groceryItemSchema)
    })

    const value = schema.validate(req.body)
    if (value.error != null) {
      throw value.error
    }

    if (req.userId == null) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }
    const user = await getUserById(req.userId)

    if (user == null) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }
    const orderData = await insertOrder(req.body, user)

    res.status(201).send({
      status: StatusCodes.CREATED,
      message: 'Success',
      data: orderData
    })
  } catch (error) {
    console.log('-> error:', error)
    next(error)
  }
}
