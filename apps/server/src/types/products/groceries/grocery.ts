import Product from '../product'
import GroceryType from './grocery-type'
import ProductCategory from '../product-category'
import { PrismaClient } from '@prisma/client'

abstract class Grocery extends Product {
  groceryType: GroceryType
  sellerId: string

  constructor(sellerId: string, name: string, price: number, stock: number, groceryType: GroceryType) {
    super(sellerId, name, price, ProductCategory.GROCERIES, stock)
    this.groceryType = groceryType
    this.sellerId = sellerId
  }

  async createRecord(): Promise<any> {
    const prisma = new PrismaClient()

    const product = await prisma.grocery.create({
      data: {
        groceryType: this.groceryType,
        product: {
          create: {
            productSellerId: this.sellerId,
            name: this.name,
            price: Number.parseFloat(this.price.toString()),
            category: this.category,
            stock: Number.parseInt(this.stock.toString()),
          },
        },
      },
    })

    return product
  }
}

export default Grocery