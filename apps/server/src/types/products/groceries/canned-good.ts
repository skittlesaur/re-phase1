import Grocery from './grocery'
import GroceryType from './grocery-type'

class CannedGood extends Grocery {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, GroceryType.CANNED_GOOD)
  }
}

export default CannedGood