import { Request, Response } from 'express'
//import ProductHelper from '../../../types/products/helper'
//import Product from '../../../types/products/product'
import ProductsSeller from '../../../types/users/products-seller'

const addProduct = async(req: Request, res: Response) => {
    try{
        const user = req.user as ProductsSeller
        const { name, category, stock, price} = req.body //input
        //do i need to do an await here?
    res.status(200).json({ message: 'Product added' })
    } catch(e: any){
        res.status(400).json({ error: e.message })
    }
}
export default addProduct