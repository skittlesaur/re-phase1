import Grocery from './grocery'
import GroceryType from './grocery-type'

class BakedGood extends Grocery {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, GroceryType.BAKED_GOOD)
  }
}

export default BakedGood