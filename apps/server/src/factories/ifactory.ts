import Product from '../types/products/product'

interface IFactory {
  create(sellerId: string, type: string, name: string, price: number, stock: number, ...args: any): any;
}

export default IFactory