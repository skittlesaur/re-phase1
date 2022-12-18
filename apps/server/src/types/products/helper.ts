import { PrismaClient } from '@prisma/client'
import Product from './product'
import ProductCategory from './product-category'
import ToolType from './tools/tool-type'
import PowerTool from './tools/power-tool'
import HandTool from './tools/hand-tool'

class ProductHelper {
  static async getProduct(id: string) {
    const prisma = new PrismaClient()

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    await prisma.$disconnect()

    if (!product)
      throw new Error('Product not found')

    let productInstance: Product | undefined

    if (product.category === ProductCategory.TOOLS) {
      const tool = await prisma.tool.findUnique({
        where: {
          id,
        },
        select: {
          toolType: true,
        },
      })

      if (!tool)
        throw new Error('Tool not found')

      if (tool.toolType === ToolType.HAND_TOOL)
        productInstance = new HandTool(product.name, product.price, product.stock)
      else if (tool.toolType === ToolType.POWER_TOOL)
        productInstance = new PowerTool(product.name, product.price, product.stock)
    }

    if (!productInstance)
      throw new Error('Invalid product category')

    productInstance.id = product.id
    productInstance.name = product.name
    productInstance.price = product.price
    productInstance.category = product.category as ProductCategory
    productInstance.stock = product.stock

    productInstance = await productInstance.fetchData()

    return productInstance
  }
}

export default ProductHelper