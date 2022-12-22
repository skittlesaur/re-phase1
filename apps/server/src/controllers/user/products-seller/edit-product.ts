import { Request, Response } from 'express'
import ProductsSeller from '../../../types/users/products-seller'

const editProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user as ProductsSeller
    const { id, name, price, stock } = req.body

    if (!id)
      throw new Error('Invalid Product ID')

    if (!name && !price && !stock)
      throw new Error('No changes to be made')

    const product = await user.editProduct(id, name, price, stock)

    if (!product)
      throw new Error('Failed to edit product')

    res.status(200).json(product)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default editProduct