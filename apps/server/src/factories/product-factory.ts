import ProductCategory from '../types/product-category'
import IFactory from './ifactory'
import ToolFactory from './tool-factory'

const getFactory = (type: ProductCategory): IFactory => {
  switch (type) {
    case ProductCategory.TOOLS:
      return new ToolFactory()
    default:
      throw new Error('Invalid type')
  }
}

export default getFactory