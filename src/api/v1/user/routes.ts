import express, { type RequestHandler, type Router } from 'express'

import { registerUser, authenticateUser } from './controllers'

const router: Router = express.Router()

router.post('/signup', registerUser as RequestHandler)
router.post('/login', authenticateUser as RequestHandler)

export { router as userRoutes }
