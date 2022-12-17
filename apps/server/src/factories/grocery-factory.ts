import IFactory from './ifactory';
import GroceryType from '../types/groceries/grocery-type';
import Grocery from '../types/groceries/grocery';
import Beverage from '../types/groceries/beverage';
import BakedGood from '../types/groceries/baked-good';
import CannedGood from '../types/groceries/canned-good';
import Dairy from '../types/groceries/dairy';
import BakingGood from '../types/groceries/baking-good';
import FrozenGood from '../types/groceries/frozen-good';
import Meat from '../types/groceries/meat';


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