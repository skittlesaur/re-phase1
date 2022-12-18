import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'
import Customer from './customer'
import User from './user'

class UserHelper {
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

    let userInstance: User | undefined

    if (user.role === UserRole.CUSTOMER)
      userInstance = new Customer(email, password)

    if (!userInstance)
      throw new Error('Invalid user role')


    userInstance.id = user.id
    userInstance.email = user.email
    userInstance.name = user.name ?? undefined

    userInstance = await userInstance.fetchData()

    return userInstance
  }

  static async register(role: UserRole, email: string, password: string, name?: string): Promise<any> {
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

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userExists)
      throw new Error('User already exists')

    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        name,
        role,
      },
    })

    await prisma.$disconnect()

    let userInstance: User | undefined

    if (role === UserRole.CUSTOMER)
      userInstance = new Customer(email, password, name)

    if (!userInstance)
      throw new Error('Invalid user role')

    userInstance.id = user.id
    userInstance.email = user.email
    userInstance.name = user.name ?? undefined

    userInstance = await userInstance.create()

    return userInstance
  }
}

export default UserHelper