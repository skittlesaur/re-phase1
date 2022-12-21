import { PrismaClient } from '@prisma/client'
import Product from './product'
import ProductCategory from './product-category'
import ToolType from './tools/tool-type'
import PowerTool from './tools/power-tool'
import HandTool from './tools/hand-tool'
import Fuse from 'fuse.js'

class ProductHelper {
  static async getProduct(id: string) {
    const prisma = new PrismaClient()

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

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

  static async getProducts() {
    const prisma = new PrismaClient()

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        stock: true,
      },
    })

    const productInstances = []

    for (const product of products) {
      if (product.category === ProductCategory.TOOLS) {
        const tool = await prisma.tool.findUnique({
          where: {
            id: product.id,
          },
        })

        if (!tool)
          throw new Error('Tool not found')

        productInstances.push({
          ...product,
          ...tool,
        })
      } else if (product.category === ProductCategory.OUTFITS) {
        // @todo
        // const outfit = await prisma.outfit.findUnique({
        //   where: {
        //     id: product.id,
        //   },
        // })
        // productInstances.push({
        //   ...product,
        //   ...outfit,
        // })
      } else if (product.category === ProductCategory.GROCERIES) {
        const grocery = await prisma.grocery.findUnique({
          where: {
            id: product.id,
          },
        })

        productInstances.push({
          ...product,
          ...grocery,
        })
      }
    }

    return productInstances
  }

  static async search(query: string) {
    const prisma = new PrismaClient()

    const products = await prisma.product.findMany()

    const fuse = new Fuse(products, {
      keys: [
        {
          name: 'name',
          weight: 0.8,
        },
        {
          name: 'category',
          weight: 0.5,
        },
        {
          name: 'price',
          weight: 0.1,
        },
        {
          name: 'stock',
          weight: 0.2,
        },
      ],
    })

    const results = fuse.search(query)

    const productInstances: Product[] = []

    for (const result of results) {
      const product = result.item as any

      let productInstance: Product | undefined

      if (product.category === ProductCategory.TOOLS) {
        const tool = await prisma.tool.findUnique({
          where: {
            id: product.id,
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

      if (!productInstance)
        throw new Error('Invalid product category')

      productInstances.push(productInstance)
    }

    return productInstances
  }
}

export default ProductHelper