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

  async updateProfile(name: string, email: string, oldPassword: string, newPassword: string): Promise<any> {
    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
      where: {
        id: this.id,
      },
    })

    if (!user)
      throw new Error('User not found')

    const updates: any = {}

    if (oldPassword && newPassword) {
      if (!bcrypt.compareSync(oldPassword, user.password))
        throw new Error('Invalid password')
      else
        updates.password = await bcrypt.hash(newPassword, 10)
    }

    if (name)
      updates.name = name

    if (email)
      updates.email = email

    const updatedUser = await prisma.user.update({
      where: {
        id: this.id,
      },
      data: updates,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return updatedUser
  }
}

export default User