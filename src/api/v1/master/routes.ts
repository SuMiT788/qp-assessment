import express, { type RequestHandler, type Router } from 'express'

import { mstRoleList } from './controllers'

const router: Router = express.Router()

router.get('/role', mstRoleList as RequestHandler)

export { router as mstDataRoutes }
