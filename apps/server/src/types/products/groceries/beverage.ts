import Grocery from "./grocery"
import GroceryType from './grocery-type';

class Beverage extends Grocery {
    constructor(name: string, price: number, stock: number, expirationDate: Date) {
        super(name, price, stock, GroceryType.BEVERAGE, expirationDate)
    }
}

export default Beverage