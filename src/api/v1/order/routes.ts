import express, { type RequestHandler, type Router } from 'express'

import { addOrder } from './controllers'
import { verifyToken, verifyUser } from '../../../middlewares/authJwt'

const router: Router = express.Router()

router.post('/', verifyToken, verifyUser, addOrder as RequestHandler)

export { router as orderRoutes }
