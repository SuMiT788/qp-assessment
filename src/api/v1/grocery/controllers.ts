import { type NextFunction, type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

import {
  insertGrocery,
  getGroceryList,
  findGroceryById,
  updateGroceryById,
  deleteGroceryById
} from './services'
import ApiError from '../../../utils/ApiError'

export const addGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      amount: Joi.number().required(),
      price: Joi.number().required()
    })

    const value = schema.validate(req.body)
    if (value.error != null) {
      throw value.error
    }

    const groceryData = await insertGrocery(req.body)

    res.status(201).send({
      status: StatusCodes.CREATED,
      message: 'Success',
      data: groceryData
    })
  } catch (error) {
    next(error)
  }
}

export const groceryList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const groceriesData = await getGroceryList()

    res.status(201).send({
      status: StatusCodes.OK,
      message: 'Success',
      data: groceriesData
    })
  } catch (error) {
    next(error)
  }
}

export const updateGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      amount: Joi.number().required(),
      price: Joi.number().required()
    })

    const value = schema.validate(req.body)
    if (value.error != null) {
      throw value.error
    }

    const grocery = await findGroceryById(+req.params.id)

    if (grocery == null) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Grocery details not found')
    }
    const groceryData = await updateGroceryById(req.body, grocery)

    res.status(201).send({
      status: StatusCodes.OK,
      message: 'Success',
      data: groceryData
    })
  } catch (error) {
    next(error)
  }
}

export const deleteGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const grocery = await deleteGroceryById(+req.params.id)

    res.status(201).send({
      status: StatusCodes.OK,
      message: 'Success',
      data: grocery
    })
  } catch (error) {
    next(error)
  }
}
