import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne
} from 'typeorm'

import { Order } from './Order'
import { MstRole } from './MstRole'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @ManyToOne(() => MstRole, role => role.users, { nullable: false })
  @JoinColumn({
    name: 'role_id'
  })
  role: MstRole

  @OneToMany(() => Order, order => order.user)
  orders: Order[]
}
