import generateId from '../lib/generate-id'
import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

abstract class User {
  id: string
  email: string
  password: string
  name: string
  role: UserRole

  constructor(email: string, password: string, name: string, role: UserRole) {
    this.id = generateId()
    this.email = email
    this.password = password
    this.name = name
    this.role = role
  }

  abstract createRecord(): any

  static async login(email: string, password: string): Promise<any> {
    const prisma = new PrismaClient()

    if (!email)
      throw new Error('Email is required')

    if (!password)
      throw new Error('Password is required')

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user)
      throw new Error('User not found')

    const isPasswordCorrect = bcrypt.compare(password, user.password)

    if (!isPasswordCorrect)
      throw new Error('Incorrect password')

    await prisma.$disconnect()

    const { password: pass, ...userWithoutPassword } = user

    return userWithoutPassword
  }

  static async register(email: string, password: string, name?: string, userRole?: UserRole): Promise<any> {
    const prisma = new PrismaClient()

    if (!email)
      throw new Error('Email is required')

    if (!password)
      throw new Error('Password is required')

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isEmailValid = emailRegex.test(email)

    if (!isEmailValid)
      throw new Error('Invalid email')

    if (password.length < 8)
      throw new Error('Password must be at least 8 characters long')

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user)
      throw new Error('User already exists')

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: userRole ?? UserRole.CUSTOMER,
      },
    })

    await prisma.$disconnect()

    const { password: pass, ...userWithoutPassword } = newUser

    return userWithoutPassword
  }
}

export default User