import { Request, Response } from 'express'
import ProductHelper from '../../../types/products/helper'
import Customer from '../../../types/users/customer'

const addCart = async (req: Request, res: Response) => {
  try {
    const user = req.user as Customer
    const { productId, quantity: qt } = req.body
    const quantity = qt ?? 1

    if (!productId)
      throw new Error('Product ID is required')

    const product = await ProductHelper.getProduct(productId)

    if (!product)
      throw new Error('Product not found')

    await user.addCart(product, quantity)

    res.status(200).json({ message: 'Product added to cart' })
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default addCart