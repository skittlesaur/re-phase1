import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT

const server = express()

server.use(cors())
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

export default server