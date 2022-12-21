import { NextFunction, Request, Response } from 'express'
import UserRole from '../types/users/user-role'

const userRole = (role: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role)
      return res.status(401).json({ error: 'Unauthorized' })

    next()
  }
}

export default userRole