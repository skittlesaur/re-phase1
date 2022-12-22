import Outfits from './outfit'
//import OutfitType from './outfit-type'
import { OutfitType } from '@prisma/client'

class SummerOutfits extends Outfits {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, OutfitType.SUMMER_OUTFITS)
  }
}

export default SummerOutfits