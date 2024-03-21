import express, { type Router, type Request, type Response } from 'express'

import { userRoutes } from './user/routes'
import { mstDataRoutes } from './master/routes'
import { groceryRoutes } from './grocery/routes'
import { orderRoutes } from './order/routes'

const router: Router = express.Router()

router.use('/mst', mstDataRoutes)
router.use('/user', userRoutes)
router.use('/grocery', groceryRoutes)
router.use('/order', orderRoutes)

router.get('/health', (req: Request, res: Response) => {
  const healthcheck: Record<string, unknown> = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }
  try {
    res.send(healthcheck)
  } catch (error: any) {
    healthcheck.message = error
    res.status(503).send()
  }
})

export { router as v1Routes }
