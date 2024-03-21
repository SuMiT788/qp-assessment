import express, { type Router } from 'express'

import { v1Routes } from './v1/index'

export const router: Router = express.Router()

router.use('/v1', v1Routes)
