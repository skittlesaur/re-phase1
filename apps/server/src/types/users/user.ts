import generateId from '../../lib/generate-id'
import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Customer from './customer'

abstract class User {
  id: string
  email: string
  password?: string
  name?: string
  role: UserRole

  protected constructor(role: UserRole, email: string, password?: string, name?: string) {
    this.id = generateId()
    this.email = email
    this.name = name
    this.role = role

    if (password)
      this.password = bcrypt.hashSync(password, 10)
  }

  abstract fetchData(): Promise<any>
  abstract create(): Promise<any>

  generateToken(): string {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '1d',
    })
  }
}

export default User