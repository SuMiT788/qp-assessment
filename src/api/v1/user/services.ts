import { type MstRole } from '../../../entities/MstRole'
import { User } from '../../../entities/User'
import { cryptString } from '../../../utils/bcrypt'

export async function getUserByEmail(email: string): Promise<User | null> {
  const userData = await User.findOne({
    where: {
      email
    }
  })

  return userData
}

export async function insertUser(
  data: {
    email: string
    password: string
    first_name: string
    last_name: string
  },
  role: MstRole
): Promise<User> {
  const hash = await cryptString(data.password)

  const newUser = User.create({
    email: data.email,
    password: hash,
    first_name: data.first_name,
    last_name: data.last_name,
    role
  })

  await newUser.save()
  console.log('-> newUser:', newUser)

  return newUser
}

export async function getUserRoleById(
  id: number
): Promise<{ role_id: number } | null> {
  const result = await User.createQueryBuilder('user')
    .select(['role.id'])
    .leftJoin('user.role', 'role')
    .where('user.id = :id', { id })
    .getRawOne()

  return result
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await User.findOne({ where: { id } })

  return result
}
