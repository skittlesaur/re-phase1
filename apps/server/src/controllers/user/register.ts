import { Request, Response } from 'express'
import User from '../../types/users/user'
import UserFactory from '../../factories/user-factory'
import UserHelper from '../../types/users/helper'

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body

    if (!email)
      throw new Error('Email is required')

    if (!password)
      throw new Error('Password is required')

    const user = await UserHelper.register(role?.toUpperCase() ?? 'CUSTOMER', email, password, name)

    const token = user.generateToken()

    res.cookie('token', token, { httpOnly: true })

    const { password: _, ...userWithoutPassword } = user
    res.status(200).json(userWithoutPassword)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default register