import { type Request } from 'express'

export interface IGetUserAuthInfoRequest extends Request {
  userId?: number
}
