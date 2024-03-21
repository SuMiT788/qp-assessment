import { type NextFunction, type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

import ApiError from '../../../utils/ApiError'
import { compareString } from '../../../utils/bcrypt'
import { insertUser, getUserByEmail } from './services'
import { generateToken } from '../../../utils/jwt'
import { getMstRoleById } from '../master/services'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      role_id: Joi.number().required()
    })

    const value = schema.validate(req.body)
    if (value.error != null) {
      throw value.error
    }

    const userData = await getUserByEmail(req.body.email)
    if (userData != null) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
    }

    const role = await getMstRoleById(req.body.role_id)
    if (!role) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid role_id')
    }
    console.log('-> role:', role)

    const insertResult = await insertUser(req.body, role)

    const token = generateToken({ id: insertResult.id })

    res.status(201).send({
      status: StatusCodes.CREATED,
      message: 'Success',
      token,
      data: {
        first_name: insertResult.first_name,
        last_name: insertResult.last_name
      }
    })
  } catch (error) {
    next(error)
  }
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    const value = schema.validate(req.body)
    if (value.error != null) {
      throw value.error
    }

    const userData = await getUserByEmail(req.body.email)
    if (userData === null) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email id or password'
      )
    }

    const isAuthendicated = await compareString(
      req.body.password,
      userData.password
    )
    if (!isAuthendicated) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email id or password'
      )
    }

    const token = generateToken({ id: userData.id })

    res.status(200).send({
      status: StatusCodes.OK,
      message: 'Success',
      token,
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name
      }
    })
  } catch (error) {
    next(error)
  }
}
