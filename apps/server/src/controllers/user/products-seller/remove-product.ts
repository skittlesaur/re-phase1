import { Request, Response } from 'express'
import ProductsSeller from '../../../types/users/products-seller'

const removeProduct =  async (req: Request, res: Response) => {
    try{
        const user = req.user as ProductsSeller
        const { name, category, stock, price} = req.body
        res.status(200).json({ message: 'Product removed from cart' })
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
 }

 export default removeProduct