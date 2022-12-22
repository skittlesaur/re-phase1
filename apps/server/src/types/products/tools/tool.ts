import Product from '../product'
import ProductCategory from '../product-category'
import ToolType from './tool-type'
import { PrismaClient } from '@prisma/client'

abstract class Tool extends Product {
  toolType: ToolType

  constructor(sellerId: string, name: string, price: number, stock: number, toolType: ToolType) {
    super(sellerId, name, price, ProductCategory.TOOLS, stock)
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
        productSellerId: this.sellerId,
      },
    })

    await Promise.all([toolPromise, productPromise])

    return this
  }

  async fetchData(): Promise<any> {
    const prisma = new PrismaClient()

    const tool = await prisma.tool.findUnique({
      where: {
        id: this.id,
      },
      select: {
        toolType: true,
      },
    })

    if (!tool)
      throw new Error('Tool not found')

    this.toolType = tool.toolType as ToolType

    return this
  }
}

export default Tool