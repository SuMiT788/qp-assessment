import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('grocery')
export class Grocery extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true
  })
  name: string

  @Column()
  amount: number

  @Column()
  price: number
}
