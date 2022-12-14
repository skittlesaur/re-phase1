import ProductCategory from './product-category'
import generateId from '../../lib/generate-id'

abstract class Product {
  id: string
  name: string
  price: number
  category: ProductCategory
  stock: number
  sellerId: string

  constructor(sellerId: string, name: string, price: number, category: ProductCategory, stock: number) {
    this.id = generateId()
    this.name = name
    this.price = price
    this.category = category
    this.stock = stock
    this.sellerId = sellerId
  }

  calculatePrice(quantity: number = 1): number {
    return this.price * quantity
  }

  abstract createRecord(): any
  abstract fetchData(): Promise<any>
}

export default Product