import { DataSource } from 'typeorm'

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER_NAME
} from '../config/environment'
import { MstRole } from '../entities/MstRole'
import { User } from '../entities/User'
import { Grocery } from '../entities/Grocery'
import { Order } from '../entities/Order'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER_NAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [MstRole, User, Grocery, Order]
  // synchronize: true
})
