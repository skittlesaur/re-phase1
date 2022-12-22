import User from './user'
import { PrismaClient, UserRole, Product } from '@prisma/client'
import ProductCategory from '../products/product-category'

class ProductsSeller extends User {
  products: Product[]

  constructor(email: string, password?: string, name?: string) {
    super(UserRole.PRODUCTS_SELLER, email, password, name)
    this.products = []
  }

  async fetchData(): Promise<any> {
    const prisma = new PrismaClient()

    const productSeller = await prisma.productSeller.findUnique({
      where: {
        id: this.id,
      },
      select: {
        products: true,
      },
    })

    if (!productSeller)
      throw new Error('User is not a product seller')

    this.products = productSeller.products

    return this
  }

  async create(): Promise<any> {
    const prisma = new PrismaClient()

    const productseller = await prisma.productSeller.create({
      data: {
        id: this.id,
      },
    })

    return productseller
  }

  async addProduct(name: string, category: ProductCategory, stock: number, price: number): Promise<any> {
    const prisma = new PrismaClient()

    const product = await prisma.product.create({
      data: {
        name,
        price,
        stock,
        category,
        productSellerId: this.id,
      },
    })

    return product
  }

  async removeProduct(id: string): Promise<any> {
    const prisma = new PrismaClient()

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product)
      throw new Error('Cannot find this product')

    if (product.productSellerId !== this.id)
      throw new Error('You are not the owner of this product')

    const removedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })

    return removedProduct
  }

  async viewProductInsights(): Promise<any> {
    const prisma = new PrismaClient()

    const insights = await prisma.product.findMany({
      where: {
        productSellerId: this.id,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        category: true,
        Tool: true,
        Review: true,
        Grocery: true,
        Outfits: true,
      },
      orderBy: {
        id: 'asc',
      },
    })

    if (!insights)
      throw new Error('Cannot find this product\'s seller')

    return insights
  }

  async editProduct(id: string, name: string, price: number, stock: number): Promise<any> {
    const prisma = new PrismaClient()

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product)
      throw new Error('Cannot find this product')

    if (product.productSellerId !== this.id)
      throw new Error('You are not the owner of this product')

    let updates: any = {}

    if (name) updates.name = name
    if (stock) updates.stock = stock
    if (price) updates.price = price

    const editedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: updates,
    })

    return editedProduct
  }
}

export default ProductsSeller