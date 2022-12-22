import Grocery from './grocery'
import GroceryType from './grocery-type'

class BakingGood extends Grocery {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, GroceryType.BAKING_GOOD)
  }
}

export default BakingGood