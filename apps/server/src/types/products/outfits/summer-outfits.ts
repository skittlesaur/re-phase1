import Outfits from './outfit'
//import OutfitType from './outfit-type'
import { OutfitType } from '@prisma/client'

class SummerOutfits extends Outfits{
    fetchData(): Promise<any> {
        throw new Error('Method not implemented.')
    }
    constructor(name: string, price: number, stock: number){
        super(name, price, stock, OutfitType.SUMMER_OUTFITS)
    }
}
export default SummerOutfits