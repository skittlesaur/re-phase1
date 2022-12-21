import { Request, Response } from 'express'
import Customer from '../../../types/users/customer'

const purchase = async (req: Request, res: Response) => {
  try {
    const user = req.user as Customer

    const purchase = await user.purchase()

    res.status(200).json({ success: true, ...purchase })
  } catch (e: any) {
    res.status(400).json({ success: false, error: e.message })
  }
}

export default purchase