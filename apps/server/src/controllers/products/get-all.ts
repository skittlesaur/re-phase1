import { Request, Response } from 'express'
import ProductHelper from '../../types/products/helper'

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductHelper.getProducts()

    res.status(200).json(products)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default getAllProducts