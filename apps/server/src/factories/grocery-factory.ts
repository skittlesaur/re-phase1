import IFactory from './ifactory'
import GroceryType from '../types/products/groceries/grocery-type'
import Grocery from '../types/products/groceries/grocery'
import Beverage from '../types/products/groceries/beverage'
import BakedGood from '../types/products/groceries/baked-good'
import CannedGood from '../types/products/groceries/canned-good'
import Dairy from '../types/products/groceries/dairy'
import BakingGood from '../types/products/groceries/baking-good'
import FrozenGood from '../types/products/groceries/frozen-good'
import Meat from '../types/products/groceries/meat'
import ToolType from '../types/products/tools/tool-type'
import Tool from '../types/products/tools/tool'

class GroceryFactory implements IFactory {
  create(sellerId: string, grocery: GroceryType, name: string, price: number, stock: number): Grocery {
    switch (grocery) {
      case GroceryType.BEVERAGE:
        return new Beverage(sellerId, name, price, stock)
      case GroceryType.BAKED_GOOD:
        return new BakedGood(sellerId, name, price, stock)
      case GroceryType.CANNED_GOOD:
        return new CannedGood(sellerId, name, price, stock)
      case GroceryType.DAIRY:
        return new Dairy(sellerId, name, price, stock)
      case GroceryType.BAKING_GOOD:
        return new BakingGood(sellerId, name, price, stock)
      case GroceryType.FROZEN_GOOD:
        return new FrozenGood(sellerId, name, price, stock)
      case GroceryType.MEAT:
        return new Meat(sellerId, name, price, stock)
      default:
        throw new Error('Invalid grocery type')

    }
  }
}

export default GroceryFactory