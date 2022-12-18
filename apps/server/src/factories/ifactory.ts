import Product from '../types/product'

interface IFactory {
  create(type: string, props: any): any;
}

export default IFactory