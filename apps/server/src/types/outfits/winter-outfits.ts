import Outfits from './outfits'
import OutfitType from './outfit-type'

class WinterOutfits extends Outfits{
    constructor(name: string, price: number, stock: number){
        super(name, price, stock, OutfitType.WINTER_OUTFITS)
    }
}
export default WinterOutfits