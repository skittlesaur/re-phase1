import { Request, Response } from 'express'
import getFactory from '../../factories/product-factory'

const createProduct = async (req: Request, res: Response) => {
  try {
    const { category, type, props } = req.body

    const factory = getFactory(category?.toUpperCase())

    if (!factory)
      throw new Error('Invalid Category')

    const product = await factory.create(type?.toUpperCase(), props)?.createRecord()

    if (!product)
      throw new Error('Failed to create product')

    res.status(200).json(product)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export default createProduct