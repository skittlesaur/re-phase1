import Product from '../product'
import ProductCategory from '../product-category'
//import OutfitType from '../products/outfit-type'
import { PrismaClient } from '@prisma/client'
//import OutfitType from './outfit-type'
import { OutfitType } from '@prisma/client'


abstract class Outfits extends Product {
  outfitType: OutfitType
  sellerId: string

  constructor(sellerId: string, name: string, price: number, stock: number, outfitType: OutfitType) {
    super(sellerId, name, price, ProductCategory.OUTFITS, stock)
    this.outfitType = outfitType
    this.sellerId = sellerId
  }

  async createRecord(): Promise<any> {
    const prisma = new PrismaClient()
    const outfitPromise = prisma.outfits.create({
      data: {
        id: this.id,
        outfitType: this.outfitType as OutfitType,
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
    await prisma.$disconnect()

    return this

  }

  async fetchData(): Promise<any> {
    const prisma = new PrismaClient()

    const outfit = await prisma.outfits.findUnique({
      where: {
        id: this.id,
      },
      select: {
        outfitType: true
      },
    })

    if (!outfit)
      throw new Error('User is not a customer')

    return this
  }
}

export default Outfits