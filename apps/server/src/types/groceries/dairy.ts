import Grocery from "./grocery"
import GroceryType from './grocery-type';

class Dairy extends Grocery {
    constructor(name: string, price: number, stock: number, expirationDate: Date) {
        super(name, price, stock, GroceryType.DAIRY, expirationDate)
    }
}

export default Dairy