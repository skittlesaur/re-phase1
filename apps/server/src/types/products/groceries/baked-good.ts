import Grocery from "./grocery"
import GroceryType from './grocery-type';

class BakedGood extends Grocery {
    constructor(name: string, price: number, stock: number, expirationDate: Date) {
        super(name, price, stock, GroceryType.BAKED_GOOD, expirationDate)
    }
}

export default BakedGood