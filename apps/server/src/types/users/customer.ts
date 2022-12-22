import User from './user'
import { Cart, PrismaClient, PurchaseHistory, Review, UserRole } from '@prisma/client'
import Product from '../products/product'
import generateId from '../../lib/generate-id'
import cart from '../../controllers/user/customer/cart'

class Customer extends User {
  cart?: Cart
  purchaseHistory?: PurchaseHistory[]
  reviews?: Review[]

  constructor(email: string, password?: string, name?: string) {
    super(UserRole.CUSTOMER, email, password, name)
  }

  async addCart(product: Product, quantity: number = 1): Promise<any> {
    const prisma = new PrismaClient()

    const cartExists = this.cart && await prisma.cart.findUnique({
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

    if (!this.cart)
      throw new Error('Cart not found')

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
        total,
        items: cart.cartItems.map(cartItem => ({
          productId: cartItem.productId,
          productName: cartItem.product.name,
          productPrice: cartItem.product.price,
          quantity: cartItem.quantity,
        })),
        customer: {
          connect: {
            id: this.id,
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

    return purchaseHistory
  }

  async viewOwnComplaints(): Promise<any> {
    const prisma = new PrismaClient()

    const complaints = await prisma.complaint.findMany({
      where: {
        authorId: this.id,
      },
      select: {
        date: true,
        title: true,
        status: true,
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return complaints

  }

  async viewComplaint(complaintId: string): Promise<any> {
    const prisma = new PrismaClient()

    const complaint = await prisma.complaint.findUnique({
      where: {
        id: complaintId,
      },
      select: {
        title: true,
        text: true,
        date: true,
        status: true,
        author: {
          select: {
            email: true,
            name: true,
          },
        },
        replies: {
          select: {
            text: true,
            date: true,
            author: {
              select: {
                email: true,
                name: true,
              },
            },
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    })

    if (!complaint)
      throw new Error('Cannot find this complaint')

    return complaint
  }

  async writeComplaint(title: string, text: string): Promise<any> {
    const prisma = new PrismaClient()

    const complaint = await prisma.complaint.create({
      data: {
        title: title,
        text: text,
        status: false, //false means it has not been solved yet
        author: {
          connect: {
            id: this.id,
          },
        },
      },
    })

    if (!complaint)
      throw new Error('reply creation failed')

    return complaint
  }

  async writeReply(text: string, complaintId: string): Promise<any> {
    const prisma = new PrismaClient()

    const reply = await prisma.reply.create({
      data: {
        text: text,
        author: {
          connect: {
            id: this.id,
          },
        },
        complaint: {
          connect: {
            id: complaintId,
          },
        },
      },
    })

    if (!reply)
      throw new Error('reply creation failed')

    return reply
  }

  async writeReview(productId: string, rating: number): Promise<any> {
    const prisma = new PrismaClient()

    const review = await prisma.review.create({
      data: {
        customer: {
          connect: {
            id: this.id,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        rating: rating,
      },
    })

    if (!review)
      throw new Error('review creation failed')

    return review
  }

  async create(): Promise<any> {
    const prisma = new PrismaClient()

    const customer = await prisma.customer.create({
      data: {
        id: this.id,
      },
    })

    return this
  }

  async getPurchaseHistory(): Promise<any> {
    const prisma = new PrismaClient()

    const purchases = await prisma.purchaseHistory.findMany({
      where: {
        customerId: this.id,
      },
      select: {
        id: true,
        total: true,
        createdAt: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return purchases
  }
}

export default Customer