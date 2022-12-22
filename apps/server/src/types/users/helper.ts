import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'
import Customer from './customer'
import User from './user'
import jwt from 'jsonwebtoken'
import CustomerService from './customer-service'

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

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect)
      throw new Error('Incorrect password')

    return user
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

    return user
  }

  static async authenticate(token: string): Promise<any> {
    const { id } = await this.verifyToken(token) as any
    const prisma = new PrismaClient()

    let user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user)
      throw new Error('User not found')

    if (user.role === UserRole.CUSTOMER) {
      const customer = new Customer(user.email)
      customer.id = user.id
      customer.name = user.name ?? undefined
      customer.role = user.role
      user = await customer.fetchData()
    } else if (user.role === UserRole.CUSTOMER_SERVICE) {
      const customerService = new CustomerService(user.email)
      customerService.id = user.id
      customerService.name = user.name ?? undefined
      customerService.role = user.role
      user = await customerService.fetchData()
    }
    // @todo product seller

    return user
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET ?? '')
  }

  static async getUser(id: string) {
    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user)
      throw new Error('User not found')

    let userInstance: any

    if (user.role === UserRole.CUSTOMER) {
      const customer = await prisma.customer.findUnique({
        where: {
          id,
        },
      })

      if (!customer)
        throw new Error('Customer not found')

      userInstance = {
        ...user,
        ...customer,
      }
    }

    if (user.role === UserRole.CUSTOMER_SERVICE) {
      const customerService = await prisma.customerService.findUnique({
        where: {
          id,
        },
      })

      if (!customerService)
        throw new Error('Customer service not found')

      userInstance = {
        ...user,
        ...customerService,
      }
    }

    if (!userInstance)
      throw new Error('Invalid user role')

    return userInstance
  }

  static generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '1d',
    })
  }
}

export default UserHelper