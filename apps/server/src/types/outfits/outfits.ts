import Product from '../product'
import ProductCategory from '../product-category'
import OutfitType from './outfit-type'
//import { PrismaClient } from '@prisma/client'

abstract class Outfits extends Product{
    outfittype: OutfitType

    constructor(name: string, price: number, stock: number, outfittype:OutfitType){
        super(name, price, ProductCategory.OUTFITS, stock)
        this.outfittype = outfittype;
    }
    /****DATABASE PART // I rephrased it into outfits, just please do the db part******/
    async createRecord(): Promise<any> {
      const prisma = new PrismaClient()
  
   const outfitPromise = prisma.outfits.create({
    data: {
      id: this.id,
      toolType: this.outfitType,
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

  await Promise.all([outfitPromise, productPromise])

  await prisma.$disconnect()

  return this
  
}
}
export default Outfits