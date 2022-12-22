import { Request, Response } from 'express'
import User from '../../types/users/user'

const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user as User
    if (!user) throw new Error('User not found')

    const { name, email, oldPassword, newPassword } = req.body

    const updatedUser = await user.updateProfile(name, email, oldPassword, newPassword)

    return res.status(200).json(updatedUser)
  } catch (e) {

  }
}

export default updateProfile