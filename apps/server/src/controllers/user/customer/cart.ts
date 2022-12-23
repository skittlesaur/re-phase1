import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Customer from '../../../types/users/customer'

const getUser = async (req: any, res: Response) => {
  try {
    const user = req?.user as Customer

    const prisma = new PrismaClient()

    if (!user?.cart?.id) throw new Error('Cart not found')

    const cart = await prisma.cart.findUnique({
      where: {
        id: user.cart.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    })

    res.status(200).json(cart)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default getUser