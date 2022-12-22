import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import User from '../../types/users/user'

const getUser = async (req: Request, res: Response) => {
  try {
    const { user } = req
    if (!user) throw new Error('User not found')

    res.status(200).json(user)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default getUser