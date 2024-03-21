import { type RequestHandler, type NextFunction, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

import { JWT_SECRET } from '../config/environment'
import { type IGetUserAuthInfoRequest } from '../utils/interfaces'
import { getUserRoleById } from '../api/v1/user/services'
import { role } from '../config/mstData'

export const verifyToken: RequestHandler = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization

  if (token == null) {
    res.status(StatusCodes.FORBIDDEN).send({
      message: 'No token provided!'
    })
    return
  }

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err != null) {
      res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Unauthorized!'
      })
      return
    }

    if (typeof decoded === 'object') {
      req.userId = decoded?.id
    }
    next()
  })
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const verifyAdmin: RequestHandler = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.userId == null) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Unauthorized!'
    })
    return
  }

  const userData = await getUserRoleById(req.userId)
  if (userData == null || userData.role_id !== role.ADMIN) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Unauthorized!'
    })
    return
  }

  next()
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const verifyUser: RequestHandler = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.userId == null) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Unauthorized!'
    })
    return
  }

  const userData = await getUserRoleById(req.userId)
  if (userData == null || userData.role_id !== role.USER) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Unauthorized!'
    })
    return
  }

  next()
}
