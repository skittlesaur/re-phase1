import { Request, Response } from 'express'
import Customer from '../../../types/users/customer'

const writeReview = async (req: Request, res: Response) => {
  try {
    const user = req.user as Customer
    const { productId, rating } = req.body

    const review = await user.writeReview(productId, rating)

    return res.status(200).json(review)

  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export default writeReview