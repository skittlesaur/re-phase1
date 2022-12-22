import Outfits from '../types/products/outfits/outfit'
import OutfitType from '../types/products/outfits/outfit-type'
import SummerOutfits from '../types/products/outfits/summer-outfits'
import WinterOutfits from '../types/products/outfits/winter-outfits'
import IFactory from './ifactory'
import Product from '../types/products/product'
import GroceryType from '../types/products/groceries/grocery-type'
import Grocery from '../types/products/groceries/grocery'
import Outfit from '../types/products/outfits/outfit'

interface OutfitProperties {
  name: string
  price: number
  stock: number
}

class OutfitsFactory implements IFactory {
  create(sellerId: string, type: OutfitType, name: string, price: number, stock: number): Outfit {
    switch (type) {
      case OutfitType.SUMMER_OUTFITS:
        return new SummerOutfits(sellerId, name, price, stock)
      case OutfitType.WINTER_OUTFITS:
        return new WinterOutfits(sellerId, name, price, stock)
      default:
        throw new Error('Invalid outfit type')
    }
  }
}

export default OutfitsFactory