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

dotenv.config()
const PORT = process.env.PORT

const server = express()

server.use(cors())
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

server.post('/products', createProduct)

server.post('/user/login', login)
server.post('/user/register', register)

// authenticated user
server.use(authenticatedUserMiddleware)

server.post('/user/customer/purchase', userRole(UserRole.CUSTOMER), purchase)
server.post('/user/customer/cart', userRole(UserRole.CUSTOMER), addCart)
server.delete('/user/customer/cart', userRole(UserRole.CUSTOMER), removeCart)

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server