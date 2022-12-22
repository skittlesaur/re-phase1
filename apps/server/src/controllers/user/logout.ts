import { Request, Response } from 'express'

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout success' })
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export default logout