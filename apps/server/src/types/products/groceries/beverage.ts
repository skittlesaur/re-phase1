import Grocery from './grocery'
import GroceryType from './grocery-type'

class Beverage extends Grocery {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, GroceryType.BEVERAGE)
  }
}

export default Beverage