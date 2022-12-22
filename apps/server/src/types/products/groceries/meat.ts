import Grocery from './grocery'
import GroceryType from './grocery-type'

class Meat extends Grocery {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, GroceryType.MEAT)
  }
}

export default Meat