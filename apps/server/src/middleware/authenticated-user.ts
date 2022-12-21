import { NextFunction, Request, Response } from 'express'
import UserHelper from '../types/users/helper'

const authenticatedUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token

    if (!token)
      throw new Error('Token is required')

    const user = await UserHelper.authenticate(token)
    req.user = user

    next()
  } catch (e: any) {
    res.status(401).json({ error: e.message })
  }
}

export default authenticatedUserMiddleware