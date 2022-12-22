import Outfits from './outfit'
import OutfitType from './outfit-type'

class WinterOutfits extends Outfits {
  constructor(sellerId: string, name: string, price: number, stock: number) {
    super(sellerId, name, price, stock, OutfitType.WINTER_OUTFITS)
  }
}

export default WinterOutfits