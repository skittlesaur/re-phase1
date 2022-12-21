import { Request, Response } from 'express'
import Customer from '../../../types/users/customer';

const writeComplaint = async (req: Request, res: Response) => {
    try {

        const user = req.user as Customer
        const { title, text } = req.body

        const complaint = await user.writeComplaint(title, text)

        return res.status(200).json(complaint)

    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }
}

export default writeComplaint