import Product from '../types/product'

interface IFactory {
  create(type: string, props: any): Product;
}

export default IFactory