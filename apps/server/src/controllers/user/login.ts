import { Request, Response } from 'express'
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

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      domain: process.env.COOKIE_DOMAIN,
    })

    const { password: _, ...userWithoutPassword } = user
    res.status(200).json(userWithoutPassword)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default login