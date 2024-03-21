import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/environment'

export function generateToken(data: object): string {
  const token = jwt.sign(data, JWT_SECRET, {
    algorithm: 'HS256',
    allowInsecureKeySizes: true
  })

  return token
}
