import User from "./user"
import { ProductCategory, PrismaClient, UserRole, Product, ProductSeller} from "@prisma/client"
import addProduct from "../../controllers/user/products-seller/add-product"

class ProductsSeller extends User{
    productSeller: ProductSeller
    category: ProductCategory
    product: Product
    async fetchData(): Promise<any> {
        const prisma = new PrismaClient()

        const productseller = await prisma.productSeller.findUnique({
            where: {
                id: this.id,
            }
        })
        if (!productseller)
         throw new Error('User is not a product seller')

        return productseller
    }
    async create(): Promise<any> {
        const prisma = new PrismaClient()

        const productseller = await prisma.productSeller.create({
            data: {
              id: this.id,
              category: this.category,
            },
        })
      
        return productseller
    }
    constructor(email: string, password?: string, name?: string){
        super(UserRole.PRODUCTS_SELLLER, email, password, name)
    }
     async addProduct(name: string, category: ProductCategory, stock: number, price: number): Promise<any>{
        const prisma = new PrismaClient()

        const product = await prisma.product.create({
            data: {
                name, price, stock, category,
            }
        })
        return product
     }
     async removeProduct(id: string):Promise<any> {
        const prisma = new PrismaClient()
        const productseller =  await prisma.product.delete({
            where: {
               id: id,
            },
          })
       return productseller
    }
    async viewProductInsights(): Promise<any>{
        const prisma = new PrismaClient()

        const insights = await prisma.product.findMany({
            select:{
                id: true,
                name: true,
                price: true,
                stock: true,
                category: true,
                Review: true,
            },
            orderBy:{
                id: "asc"
            }
        })
        if (!insights)
         throw new Error("Cannot find this product's insights")
        return insights
    }
}
export default ProductsSeller