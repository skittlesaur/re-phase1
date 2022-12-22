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
      include: {
        Review: {
          select: {
            customerId: true,
            rating: true,
          },
        },
      },
    })

    if (!product)
      throw new Error('Product not found')

    let productInstance: any
    const productAny = product as any
    const ratingsSum = product.Review.reduce((acc, review) => acc + review.rating, 0)
    const ratingsCount = product.Review.length
    const averageRating = ratingsSum / ratingsCount
    const rating = {
      average: averageRating,
      count: ratingsCount,
      ids: product.Review.map(review => review.customerId),
    }

    delete productAny.Review

    if (product.category === ProductCategory.TOOLS) {
      const tool = await prisma.tool.findUnique({
        where: {
          id: product.id,
        },
      })

      if (!tool)
        throw new Error('Tool not found')

      productInstance = {
        ...productAny,
        ...tool,
        rating,
      }
    } else if (product.category === ProductCategory.OUTFITS) {
      // @todo
    } else if (product.category === ProductCategory.GROCERIES) {
      const grocery = await prisma.grocery.findUnique({
        where: {
          id: product.id,
        },
      })

      productInstance = {
        ...productAny,
        ...grocery,
        rating,
      }
    }

    return productInstance
  }

  static async getProducts() {
    const prisma = new PrismaClient()

    const products = await prisma.product.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        stock: true,
        Review: {
          select: {
            customerId: true,
            rating: true,
          },
        },
      },
    })

    const productInstances = []

    for (let product of products) {
      const productAny = product as any
      const ratingsSum = product.Review.reduce((acc, review) => acc + review.rating, 0)
      const ratingsCount = product.Review.length
      const averageRating = ratingsSum / ratingsCount
      const rating = {
        average: averageRating,
        count: ratingsCount,
        ids: product.Review.map(review => review.customerId),
      }

      delete productAny.Review

      if (product.category === ProductCategory.TOOLS) {
        const tool = await prisma.tool.findUnique({
          where: {
            id: product.id,
          },
        })

        if (!tool)
          throw new Error('Tool not found')

        productInstances.push({
          ...productAny,
          ...tool,
          rating,
        })
      } else if (product.category === ProductCategory.OUTFITS) {
        const outfit = await prisma.outfits.findUnique({
          where: {
            id: product.id,
          },
        })

        productInstances.push({
          ...productAny,
          ...outfit,
          rating,
        })
      } else if (product.category === ProductCategory.GROCERIES) {
        const grocery = await prisma.grocery.findUnique({
          where: {
            id: product.id,
          },
        })

        productInstances.push({
          ...productAny,
          ...grocery,
          rating,
        })
      }
    }

    return productInstances
  }

  static async search(query: string) {
    const prisma = new PrismaClient()

    const products = await this.getProducts()

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

    return results.map(result => result.item)
  }
}

export default ProductHelper