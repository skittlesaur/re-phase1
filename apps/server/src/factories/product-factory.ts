import ProductCategory from '../types/product-category'
import GroceryFactory from './grocery-factory'
import IFactory from './ifactory'
import OutfitsFactory from './outfits-factory'
import ToolFactory from './tool-factory'

const getFactory = (type: ProductCategory): IFactory => {
  switch (type) {
    case ProductCategory.TOOLS:
      return new ToolFactory()
    case ProductCategory.GROCERIES:
      return new GroceryFactory()
    case ProductCategory.OUTFITS:
      return new OutfitsFactory()
    default:
      throw new Error('Invalid type')
  }
}

export default getFactory