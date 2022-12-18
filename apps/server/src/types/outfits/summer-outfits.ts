import Outfits from './outfits'
import OutfitType from './outfit-type'

class SummerOutfits extends Outfits{
    constructor(name: string, price: number, stock: number){
        super(name, price, stock, OutfitType.SUMMER_OUTFITS)
    }
}
export default SummerOutfits