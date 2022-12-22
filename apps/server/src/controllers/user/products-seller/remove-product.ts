import { Request, Response } from 'express'
import ProductsSeller from '../../../types/users/products-seller'

const removeProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user as ProductsSeller
    const { id } = req.params

    if (!id)
      throw new Error('Invalid Product ID')

    const product = await user.removeProduct(id)

    if (!product)
      throw new Error('Failed to remove product')

    res.status(200).json(product)
  } catch (e: any) {
    console.log(e)
    res.status(400).json({ error: e.message })
  }
}

export default removeProduct