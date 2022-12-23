import { Request, Response } from 'express'
import Customer from '../../types/users/customer';
import CustomerService from '../../types/users/customer-service';

const reply = async (req: Request, res: Response) => {
    try {

        const role = req.user?.role?.toUpperCase()
        const { text, complaintId } = req.body

        if (role === 'CUSTOMER') {
            const user = req.user as Customer

            const reply = await user.writeReply(text, complaintId)

            return res.status(200).json(reply)
        }

        if (role === 'CUSTOMER_SERVICE') {
            const user = req.user as CustomerService

            const reply = await user.writeReply(text, complaintId)

            return res.status(200).json(reply)
        }

    } catch (e: any) {
        console.log(e)
        res.status(400).json({ message: e.message })
    }
}

export default reply