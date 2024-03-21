import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'

import { User } from './User'

@Entity({ name: 'mst_role', schema: 'public' })
export class MstRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => User, user => user.role)
  users: User[]
}
