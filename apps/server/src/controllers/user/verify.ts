import { Request, Response } from 'express'

const verify = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ verified: true })
  } catch (e: any) {
    res.status(500).json({ verified: false })
  }
}

export default verify