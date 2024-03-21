import { type User } from '../../../entities/User'
import { Order } from '../../../entities/Order'
import { Grocery } from '../../../entities/Grocery'
import { AppDataSource } from '../../../helpers/dbConnection'

export async function insertOrder(
  data: {
    groceryList: Array<{
      id: number
      name: string
      amount: number
      price: number
    }>
  },
  user: User
): Promise<Order | null> {
  const queryRunner = AppDataSource.createQueryRunner()

  try {
    await queryRunner.startTransaction()
    for (let i = 0; i < data.groceryList.length; i++) {
      const grocery = await Grocery.findOne({
        where: { id: data.groceryList[i].id }
      })
      if (grocery == null) {
        throw new Error(`Grocery not found for ID: ${data.groceryList[i].id}`)
      }

      if (grocery.amount < data.groceryList[i].amount) {
        throw new Error(
          `Insufficient amount in inventory for Grocery ID: ${data.groceryList[i].id}`
        )
      }

      data.groceryList[i].price = grocery.price
      grocery.amount = grocery.amount - data.groceryList[i].amount
      await queryRunner.manager.save(Grocery, grocery)
    }

    const newOrder = Order.create({
      groceryList: data.groceryList,
      user
    })

    await queryRunner.manager.save(Order, newOrder)

    await queryRunner.commitTransaction()

    return newOrder
  } catch (error) {
    await queryRunner.rollbackTransaction()
    throw error
  } finally {
    await queryRunner.release()
  }
}
