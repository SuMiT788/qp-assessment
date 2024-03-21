import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { User } from './User'

interface GroceryItem {
  grocery_id: number
  amount: number
  price: number
}

@Entity('order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'json'
  })
  groceryList: GroceryItem[]

  @ManyToOne(() => User, user => user.orders, { nullable: false })
  @JoinColumn({
    name: 'user_id'
  })
  user: User
}
