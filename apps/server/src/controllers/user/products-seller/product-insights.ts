import { Request, Response } from 'express'
import ProductsSeller from '../../../types/users/products-seller'

const viewProductInsights = async (req: Request, res: Response) => {
  try {
    const user = req.user as ProductsSeller
    const productInsight = await user.viewProductInsights()
    return res.status(200).json(productInsight)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}
export default viewProductInsights
