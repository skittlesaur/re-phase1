import { Request, Response } from 'express'
import User from '../../types/users/user'
import userFactory from '../../factories/user-factory'
import UserRole from '../../types/users/user-role'
import UserFactory from '../../factories/user-factory'
import UserHelper from '../../types/users/helper'

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email)
      throw new Error('Email is required')

    if (!password)
      throw new Error('Password is required')

    const user = await UserHelper.login(email, password)

    const token = user.generateToken()

    res.cookie('token', token, { httpOnly: true })

    const { password: _, ...userWithoutPassword } = user
    res.status(200).json(userWithoutPassword)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default login