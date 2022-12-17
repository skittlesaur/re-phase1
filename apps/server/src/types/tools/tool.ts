import Product from '../product'
import ProductCategory from '../product-category'
import ToolType from './tool-type'
import { PrismaClient } from '@prisma/client'

abstract class Tool extends Product {
  toolType: ToolType

  constructor(name: string, price: number, stock: number, toolType: ToolType) {
    super(name, price, ProductCategory.TOOLS, stock)
    this.toolType = toolType
  }

  async createRecord(): Promise<any> {
    const prisma = new PrismaClient()

    const toolPromise = prisma.tool.create({
      data: {
        id: this.id,
        toolType: this.toolType,
      },
    })

    const productPromise = prisma.product.create({
      data: {
        id: this.id,
        name: this.name,
        price: this.price,
        category: this.category,
        stock: this.stock,
      },
    })

    await Promise.all([toolPromise, productPromise])

    await prisma.$disconnect()

    return this
  }
}

export default Tool