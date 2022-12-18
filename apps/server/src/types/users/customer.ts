import User from './user'
import { Cart, PrismaClient, PurchaseHistory, Review, UserRole } from '@prisma/client'
import Product from '../products/product'
import generateId from '../../lib/generate-id'

class Customer extends User {
  cart: Cart
  purchaseHistory: PurchaseHistory[]
  reviews: Review[]

  constructor(email: string, password?: string, name?: string) {
    super(UserRole.CUSTOMER, email, password, name)
  }

  async addCart(product: Product, quantity: number = 1): Promise<any> {
    const prisma = new PrismaClient()

    const cartExists = await prisma.cart.findUnique({
      where: {
        id: this.cart?.id ?? '',
      },
    })

    if (!cartExists) {
      const cart = await prisma.cart.create({
        data: {
          id: generateId(),
          customer: {
            connect: {
              id: this.id,
            },
          },
        },
      })

      this.cart = cart
    }

    const cartHasProduct = await prisma.cart.findFirst({
      where: {
        id: this.cart?.id,
        cartItems: {
          some: {
            productId: product.id,
          },
        },
      },
    })

    if (cartHasProduct) {
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: this.cart?.id,
          productId: product.id,
        },
      })

      if (cartItem) {
        await prisma.cartItem.update({
          where: {
            id: cartItem.id,
          },
          data: {
            quantity: {
              increment: quantity,
            },
          },
        })
      }
    }

    if (!cartHasProduct) {
      await prisma.cartItem.create({
        data: {
          id: generateId(),
          cartId: this.cart?.id,
          productId: product.id,
          quantity,
        },
      })
    }

    await prisma.$disconnect()

    return this
  }

  async removeCart(product: Product, quantity: number = 1): Promise<any> {
    const prisma = new PrismaClient()

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: this.cart?.id,
        productId: product.id,
      },
    })

    if (!cartItem)
      throw new Error('Product not found in cart')

    if (cartItem.quantity <= quantity) {
      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      })
    } else {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      })
    }

    await prisma.$disconnect()

    return this
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

  async purchase() {
    const prisma = new PrismaClient()

    const cart = await prisma.cart.findUnique({
      where: {
        id: this.cart?.id ?? '',
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart)
      throw new Error('Cart not found')

    let total = 0
    for (const cartItem of cart.cartItems) {
      if (cartItem.product.stock < cartItem.quantity)
        throw new Error(`Product ${cartItem.product.name} has insufficient stock`)

      total += cartItem.product.price * cartItem.quantity
    }

    const purchaseHistory = await prisma.purchaseHistory.create({
      data: {
        id: generateId(),
        total,
        customer: {
          connect: {
            id: this.id,
          },
        },
        cart: {
          connect: {
            id: cart.id,
          },
        },
      },
    })

    for (const cartItem of cart.cartItems) {
      await prisma.product.update({
        where: {
          id: cartItem.product.id,
        },
        data: {
          stock: {
            decrement: cartItem.quantity,
          },
        },
      })
    }

    await prisma.cart.delete({
      where: {
        id: cart.id,
      },
    })

    await prisma.$disconnect()

    return purchaseHistory
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