import Grocery from "./grocery"
import GroceryType from './grocery-type';

class Meat extends Grocery {
    constructor(name: string, price: number, stock: number, expirationDate: Date) {
        super(name, price, stock, GroceryType.MEAT, expirationDate)
    }
}

export default Meat