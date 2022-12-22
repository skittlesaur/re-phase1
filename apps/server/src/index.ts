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
server.post('/user/customer/purchase', userRole(UserRole.CUSTOMER), purchase)
server.get('/user/customer/cart', userRole(UserRole.CUSTOMER), cart)
server.post('/user/customer/cart', userRole(UserRole.CUSTOMER), addCart)
server.delete('/user/customer/cart', userRole(UserRole.CUSTOMER), removeCart)
server.get('/user/customer/history', userRole(UserRole.CUSTOMER), purchaseHistory)
server.get('/user/customer/complaint', userRole(UserRole.CUSTOMER), viewComplaint)
server.post('/user/customer/reply', userRole(UserRole.CUSTOMER), reply)
server.get('/user/customer/myComplaints', userRole(UserRole.CUSTOMER), viewOwnComplaints)
server.post('/user/customer/writeComplaint', userRole(UserRole.CUSTOMER), writeComplaint)
server.post('/user/customer/review', userRole(UserRole.CUSTOMER), writeReview)

// Authenticated Customer Service 
server.get('/user/customer-service/', userRole(UserRole.CUSTOMER_SERVICE), viewAllComplaints)
server.put('/user/customer-service/status', userRole(UserRole.CUSTOMER_SERVICE), updateComplaints)
server.get('/user/customer-service/complaint', userRole(UserRole.CUSTOMER_SERVICE), viewComplaint)
server.post('/user/customer-service/reply', userRole(UserRole.CUSTOMER_SERVICE), reply)


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server