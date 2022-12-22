/*He provides the product on the system.
● He can edit any added product.
● He can remove any added product.
● He can check the performance of a product*/
import User from "./user"
//import Product from '../products/product'
import { ProductCategory, PrismaClient, UserRole, Product} from "@prisma/client"
import generateId from '../../lib/generate-id'
import addProduct from "../../controllers/user/products-seller/add-product"

class ProductsSeller extends User{
    product: Product
   // category: ProductCategory
    fetchData(): Promise<any> {
        throw new Error("Method not implemented.")
    }
    create(): Promise<any> {
        throw new Error("Method not implemented.")
    }
    constructor(email: string, password?: string, name?: string){
        super(UserRole.PRODUCTS_SELLLER, email, password, name)
    }
     async addProduct(name: string, category: ProductCategory, stock: number, price: number): Promise<any>{
        const prisma = new PrismaClient()
        const productExists = await prisma.product.findUnique({
            where:{
                id: this.product?.id ?? '',
            },
        })
        if(!productExists){
            ///////////////////////////to be completed
            const product = await prisma.product
            this.product = product
        }

     }
}
export default ProductsSeller