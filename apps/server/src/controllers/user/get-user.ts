import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import User from '../../types/users/user'

const getUser = async (req: Request, res: Response) => {
  try {
    const { user } = req
    if (!user) throw new Error('User not found')

    let userDetails: any = user

    const prism = new PrismaClient()
    if (user?.role === 'CUSTOMER') {
      userDetails = {
        ...userDetails,
        ...(await prism.customer.findUnique({
          where: {
            id: user.id,
          },
          include: {
            cart: {
              include: {
                cartItems: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        })),
      }
    }

    res.status(200).json(userDetails)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default getUser