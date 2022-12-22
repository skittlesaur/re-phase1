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

    const product = await prisma.outfits.create({
      data: {
        outfitType: this.outfitType,
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

export default Outfits