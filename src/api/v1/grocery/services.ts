import { Grocery } from '../../../entities/Grocery'

export async function insertGrocery(data: {
  name: string
  amount: number
  price: number
}): Promise<Grocery> {
  const newGrocery = Grocery.create({
    name: data.name,
    amount: data.amount,
    price: data.price
  })

  await newGrocery.save()

  return newGrocery
}

export async function getGroceryList(): Promise<Grocery[]> {
  const result = await Grocery.find()

  return result
}

export async function findGroceryById(id: number): Promise<Grocery | null> {
  const result = await Grocery.findOne({ where: { id } })

  return result
}

export async function updateGroceryById(
  data: {
    name: string
    amount: number
    price: number
  },
  grocery: Grocery
): Promise<Grocery> {
  grocery.name = data.name
  grocery.amount = data.amount
  grocery.price = data.price

  await grocery.save()

  return grocery
}

export async function deleteGroceryById(
  id: number
): Promise<{ raw: any[]; affected?: number | null | undefined }> {
  const result = await Grocery.delete(id)

  return result
}
