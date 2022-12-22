import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import createProduct from './controllers/products/create'
import login from './controllers/user/login'
import register from './controllers/user/register'
import authenticatedUserMiddleware from './middleware/authenticated-user'
import purchase from './controllers/user/customer/purchase'
import User from './types/users/user'
import userRole from './middleware/user-role'
import UserRole from './types/users/user-role'
import addCart from './controllers/user/customer/add-cart'
import removeCart from './controllers/user/customer/remove-cart'
import searchProducts from './controllers/products/search'
import getAllProducts from './controllers/products/get-all'
import verify from './controllers/user/verify'
import getUser from './controllers/user/get-user'
import cart from './controllers/user/customer/cart'
import viewAllComplaints from './controllers/user/costumer-service/view-all-complaints'
import updateComplaints from './controllers/user/costumer-service/update-complaint'
import viewComplaint from './controllers/user/view-complaint'
import reply from './controllers/user/reply'
import viewOwnComplaints from './controllers/user/customer/view-own-complaints'
import writeComplaint from './controllers/user/customer/write-complaint'
import writeReview from './controllers/user/customer/write-review'
import updateProfile from './controllers/user/update-profile'
import logout from './controllers/user/logout'
import purchaseHistory from './controllers/user/customer/history'
import { PrismaClient } from '@prisma/client'
import ProductCategory from './types/products/product-category'
import ToolType from './types/products/tools/tool-type'
import bcrypt from 'bcrypt'

dotenv.config()
const PORT = process.env.PORT

const server = express()

server.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

declare global {
  namespace Express {
    interface Request {
      user?: User | Partial<User>
    }
  }
}

server.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

server.get('/products', getAllProducts)
server.post('/products', createProduct)
server.post('/products/search', searchProducts)

server.post('/user/login', login)
server.post('/user/register', register)
server.post('/user/logout', logout)

// authenticated user
server.use(authenticatedUserMiddleware)
server.get('/user', getUser)
server.put('/user', updateProfile)
server.get('/user/verify', verify)
server.post('/user/customer/purchase', userRole([UserRole.CUSTOMER]), purchase)
server.get('/user/customer/cart', userRole([UserRole.CUSTOMER]), cart)
server.post('/user/customer/cart', userRole([UserRole.CUSTOMER]), addCart)
server.delete('/user/customer/cart', userRole([UserRole.CUSTOMER]), removeCart)
server.get('/user/customer/complaint', userRole([UserRole.CUSTOMER]), viewComplaint)
server.post('/user/customer/reply', userRole([UserRole.CUSTOMER]), reply)
server.get('/user/customer/myComplaints', userRole([UserRole.CUSTOMER]), viewOwnComplaints)
server.post('/user/customer/writeComplaint', userRole([UserRole.CUSTOMER]), writeComplaint)
server.post('/user/customer/review', userRole([UserRole.CUSTOMER]), writeReview)

// Authenticated Customer Service 
server.get('/user/customer-service/', userRole([UserRole.CUSTOMER_SERVICE]), viewAllComplaints)
server.put('/user/customer-service/status', userRole([UserRole.CUSTOMER_SERVICE]), updateComplaints)


//shared endpoints
server.get('/user/complaint', userRole([UserRole.CUSTOMER, UserRole.CUSTOMER_SERVICE]), viewComplaint)
server.post('/user/reply', userRole([UserRole.CUSTOMER, UserRole.CUSTOMER_SERVICE]), reply)


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

const generateData = async () => {
  const prisma = new PrismaClient()

  await prisma.customer.create({
    data: {
      user: {
        create: {
          email: 'customer@dev.dev',
          password: await bcrypt.hash('12341234', 10),
          role: UserRole.CUSTOMER,
        },
      },
    },
  })

  await prisma.customerService.create({
    data: {
      user: {
        create: {
          email: 'cs@dev.dev',
          password: await bcrypt.hash('12341234', 10),
          role: UserRole.CUSTOMER_SERVICE,
        },
      },
    },
  })

  await prisma.tool.create({
    data: {
      toolType: ToolType.HAND_TOOL,
      product: {
        create: {
          name: 'Hammer',
          price: 100,
          stock: 10,
          category: ProductCategory.TOOLS,
        },
      },
    },
  })

  await prisma.tool.create({
    data: {
      toolType: ToolType.POWER_TOOL,
      product: {
        create: {
          name: 'Drill',
          price: 100,
          stock: 10,
          category: ProductCategory.TOOLS,
        },
      },
    },
  })

  console.log('completed')
}

// generateData()
export default server