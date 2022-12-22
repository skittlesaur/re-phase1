import { Request, Response} from 'express'
import { ProductSeller } from '@prisma/client'

import Product from '../../../types/products/product'
import ProductsSeller from '../../../types/users/products-seller'

const viewProductInsights = async(req: Request, res: Response) => {
    try{
        prouduct: Product
        const role = req.user?.role?.toUpperCase()
        const { id } = req.body //id --> product's id

        if(role === 'PRODUCTS_SELLER'){
            const user = req.user as ProductsSeller

            const productInsight = await user.viewProductInsights()
            return res.status(200).json(productInsight)
        }
    }catch(e: any){
        res.status(400).json({ message: e.message })
    }
}
export default viewProductInsights
