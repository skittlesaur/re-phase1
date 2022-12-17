import Grocery from "./grocery"
import GroceryType from './grocery-type';

class FrozenGood extends Grocery {
    constructor(name: string, price: number, stock: number, expirationDate: Date) {
        super(name, price, stock, GroceryType.FROZEN_GOOD, expirationDate)
    }
}

export default FrozenGood