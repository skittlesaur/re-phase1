import { Request, Response } from 'express'
import ProductsSeller from '../../../types/users/products-seller'
import getFactory from '../../../factories/product-factory'

const addProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user as ProductsSeller
    const { category, type, name, price, stock } = req.body

    const factory = getFactory(category?.toUpperCase())

    if (!factory)
      throw new Error('Invalid Category')

    const product = await factory.create(user.id, type, name, price, stock)?.createRecord()

    if (!product)
      throw new Error('Failed to create product')

    res.status(200).json(product)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}
export default addProduct