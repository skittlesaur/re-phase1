import Product from '../product';
import GroceryType from './grocery-type';
import ProductCategory from '../product-category';
import { PrismaClient } from '@prisma/client';

abstract class Grocery extends Product {
    groceryType: GroceryType
    expirationDate: Date

    constructor(name: string, price: number, stock: number, groceryType: GroceryType, expirationDate: Date) {
        super(name, price, ProductCategory.GROCERIES, stock)
        this.groceryType = groceryType
        this.expirationDate = expirationDate
    }

    async createRecord(): Promise<any> {
        const prisma = new PrismaClient()

        const groceryPromise = prisma.grocery.create({
            data: {
                id: this.id,
                groceryType: this.groceryType,
                expirationDate: this.expirationDate,
            },
        })

        const productPromise = prisma.product.create({
            data: {
                id: this.id,
                name: this.name,
                price: this.price,
                category: this.category,
                stock: this.stock,
            },
        })

        await Promise.all([groceryPromise, productPromise])

        return this

    }
}

export default Grocery