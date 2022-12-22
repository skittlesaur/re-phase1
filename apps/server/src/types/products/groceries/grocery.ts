import Product from '../product'
import GroceryType from './grocery-type'
import ProductCategory from '../product-category'
import { PrismaClient } from '@prisma/client'

abstract class Grocery extends Product {
  groceryType: GroceryType

  constructor(sellerId: string, name: string, price: number, stock: number, groceryType: GroceryType) {
    super(sellerId, name, price, ProductCategory.GROCERIES, stock)
    this.groceryType = groceryType
  }

  async createRecord(): Promise<any> {
    const prisma = new PrismaClient()

    const groceryPromise = prisma.grocery.create({
      data: {
        id: this.id,
        groceryType: this.groceryType,
      },
    })

    const productPromise = prisma.product.create({
      data: {
        id: this.id,
        name: this.name,
        price: this.price,
        category: this.category,
        stock: this.stock,
        productSellerId: this.sellerId,
      },
    })

    await Promise.all([groceryPromise, productPromise])

    return this

  }
}

export default Grocery