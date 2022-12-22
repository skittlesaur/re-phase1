import Outfits from '../types/products/outfits/outfit'
import OutfitType from '../types/products/outfits/outfit-type'
import SummerOutfits from '../types/products/outfits/summer-outfits'
import WinterOutfits from '../types/products/outfits/winter-outfits'
import IFactory from './ifactory'
import Product from '../types/products/product'

interface OutfitProperties{
    name: string
    price: number
    stock: number
}
class OutfitsFactory implements IFactory{
    create(outfits: OutfitType, props: OutfitProperties): Outfits{
        switch(outfits){
            case OutfitType.SUMMER_OUTFITS:
                return new SummerOutfits(props.name, props.price, props.stock)
            case OutfitType.WINTER_OUTFITS:
                return new WinterOutfits(props.name, props.price, props.stock)
            default:
                 throw new Error('Invalid outfit type')
        }
    }
}
export default OutfitsFactory