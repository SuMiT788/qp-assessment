import bcrypt from 'bcrypt'

export async function cryptString(password: string): Promise<string> {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

export async function compareString(
  plainPass: string,
  hashword: string
): Promise<boolean> {
  const isMatch = bcrypt.compareSync(plainPass, hashword)

  return isMatch
}
