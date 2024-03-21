import express, { type RequestHandler, type Router } from 'express'

import {
  addGrocery,
  groceryList,
  updateGrocery,
  deleteGrocery
} from './controllers'
import { verifyToken, verifyAdmin } from '../../../middlewares/authJwt'

const router: Router = express.Router()

router.post('/', verifyToken, verifyAdmin, addGrocery as RequestHandler)
router.get('/', verifyToken, groceryList as RequestHandler)
router.patch('/:id', verifyToken, verifyAdmin, updateGrocery as RequestHandler)
router.delete('/:id', verifyToken, verifyAdmin, deleteGrocery as RequestHandler)

export { router as groceryRoutes }
