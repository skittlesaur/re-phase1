import { Request, Response } from 'express'
import User from '../../types/user'

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email)
      throw new Error('Email is required')

    if (!password)
      throw new Error('Password is required')

    const user = await User.login(email, password)

    res.status(200).json(user)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default login