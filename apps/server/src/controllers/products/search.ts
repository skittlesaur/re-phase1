import { Request, Response } from 'express'
import ProductHelper from '../../types/products/helper'

const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.body

    if (!query)
      throw new Error('Query is required')

    const products = await ProductHelper.search(query)

    res.status(200).json(products)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default searchProducts