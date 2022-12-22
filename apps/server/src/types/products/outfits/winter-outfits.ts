import Outfits from './outfit'
import OutfitType from './outfit-type'

class WinterOutfits extends Outfits{
    fetchData(): Promise<any> {
        throw new Error('Method not implemented.')
    }
    
    constructor(name: string, price: number, stock: number){
        super(name, price, stock, OutfitType.WINTER_OUTFITS)
    }
}
export default WinterOutfits