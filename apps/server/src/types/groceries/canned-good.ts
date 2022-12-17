import Grocery from "./grocery"
import GroceryType from './grocery-type';

class CannedGood extends Grocery {
    constructor(name: string, price: number, stock: number, expirationDate: Date) {
        super(name, price, stock, GroceryType.CANNED_GOOD, expirationDate)
    }
}

export default CannedGood