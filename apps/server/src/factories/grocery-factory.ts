import IFactory from './ifactory';
import GroceryType from '../types/products/groceries/grocery-type';
import Grocery from '../types/products/groceries/grocery';
import Beverage from '../types/products/groceries/beverage';
import BakedGood from '../types/products/groceries/baked-good';
import CannedGood from '../types/products/groceries/canned-good';
import Dairy from '../types/products/groceries/dairy';
import BakingGood from '../types/products/groceries/baking-good';
import FrozenGood from '../types/products/groceries/frozen-good';
import Meat from '../types/products/groceries/meat';


interface GroceryProps {
    name: string
    price: number
    stock: number
    expirationDate: Date
}

class GroceryFactory implements IFactory {
    create(grocery: GroceryType, props: GroceryProps): Grocery {
        switch (grocery) {
            case GroceryType.BEVERAGE:
                return new Beverage(props.name, props.price, props.stock, props.expirationDate)
            case GroceryType.BAKED_GOOD:
                return new BakedGood(props.name, props.price, props.stock, props.expirationDate)
            case GroceryType.CANNED_GOOD:
                return new CannedGood(props.name, props.price, props.stock, props.expirationDate)
            case GroceryType.DAIRY:
                return new Dairy(props.name, props.price, props.stock, props.expirationDate)
            case GroceryType.BAKING_GOOD:
                return new BakingGood(props.name, props.price, props.stock, props.expirationDate)
            case GroceryType.FROZEN_GOOD:
                return new FrozenGood(props.name, props.price, props.stock, props.expirationDate)
            case GroceryType.MEAT:
                return new Meat(props.name, props.price, props.stock, props.expirationDate)
            default:
                throw new Error('Invalid grocery type')

        }
    }
}

export default GroceryFactory