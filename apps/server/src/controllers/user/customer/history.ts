import { Request, Response } from 'express'
import Customer from '../../../types/users/customer'

const purchaseHistory = async (req: Request, res: Response) => {
  try {
    const user = req.user as Customer

    const purchaseHistory = await user.getPurchaseHistory()

    res.status(200).json(purchaseHistory)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default purchaseHistory