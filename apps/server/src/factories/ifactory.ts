import Product from '../types/products/product'

interface IFactory {
  create(type: string, props: any): any;
}

export default IFactory