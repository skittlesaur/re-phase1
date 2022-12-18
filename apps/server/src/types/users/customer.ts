import User from './user'
import { Cart, PrismaClient, PurchaseHistory, Review, UserRole } from '@prisma/client'

class Customer extends User {
  cart: Cart
  purchaseHistory: PurchaseHistory[]
  reviews: Review[]

  constructor(email: string, password?: string, name?: string) {
    super(UserRole.CUSTOMER, email, password, name)
  }

  async fetchData(): Promise<any> {
    const prisma = new PrismaClient()

    const customer = await prisma.customer.findUnique({
      where: {
        id: this.id,
      },
      select: {
        cart: true,
        purchaseHistory: true,
        reviews: true,
      },
    })

    await prisma.$disconnect()

    if (!customer)
      throw new Error('User is not a customer')

    if (customer.cart) this.cart = customer.cart
    this.purchaseHistory = customer.purchaseHistory
    this.reviews = customer.reviews

    return this
  }

  async create(): Promise<any> {
    const prisma = new PrismaClient()

    const customer = await prisma.customer.create({
      data: {
        id: this.id,
      },
    })

    await prisma.$disconnect()

    return this
  }
}

export default Customer