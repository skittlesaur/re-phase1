import Product from '../product'
import ProductCategory from '../product-category'
//import OutfitType from '../products/outfit-type'
import { PrismaClient } from '@prisma/client'
//import OutfitType from './outfit-type'
import { OutfitType } from '@prisma/client'


abstract class Outfits extends Product{
    outfitType: OutfitType
    constructor(name: string, price: number, stock: number, outfitType:OutfitType){
        super(name, price, ProductCategory.OUTFITS, stock)
        this.outfitType = outfitType;
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
    },
  })

  //await Promise.all([outfitPromise, productPromise])

  await prisma.$disconnect()

  return this
  
}/*
fetchData(): Promise<any> {
  this.outfitType = this.outfitType
}*/
}
export default Outfits