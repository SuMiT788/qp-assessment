import { type NextFunction, type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getmstRoleList } from './services'

export async function mstRoleList(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const priorityList = await getmstRoleList()

    res.status(StatusCodes.OK).send({
      message: 'Success',
      status: StatusCodes.OK,
      data: priorityList
    })
  } catch (error) {
    next(error)
  }
}
