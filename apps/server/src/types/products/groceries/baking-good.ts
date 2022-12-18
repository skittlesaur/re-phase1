import Grocery from "./grocery"
import GroceryType from './grocery-type';

class BakingGood extends Grocery {
    constructor(name: string, price: number, stock: number, expirationDate: Date) {
        super(name, price, stock, GroceryType.BAKING_GOOD, expirationDate)
    }
}

export default BakingGood