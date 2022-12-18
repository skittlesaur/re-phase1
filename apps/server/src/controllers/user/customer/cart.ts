import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import User from '../../../types/users/user'
import Customer from '../../../types/users/customer'

const getUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as Customer
    if (!user) throw new Error('User not found')

    let userDetails: any = user

    const prisma = new PrismaClient()

    const cart = await prisma.cart.findUnique({
      where: {
        id: user?.cart?.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          }
        }
      }
    })

    res.status(200).json(cart)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default getUser