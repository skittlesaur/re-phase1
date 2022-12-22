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

    const product = await prisma.tool.create({
      data: {
        toolType: this.toolType,
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