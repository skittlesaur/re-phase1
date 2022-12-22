import Grocery from './grocery'
import GroceryType from './grocery-type'

class FrozenGood extends Grocery {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, GroceryType.FROZEN_GOOD)
  }
}

export default FrozenGood