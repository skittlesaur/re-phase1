import { Request, Response } from 'express'
import CustomerService from '../../../types/users/customer-service'

const viewAllComplaints = async (req: Request, res: Response) => {
    try {

        const user = req.user as CustomerService

        const complaints = await user.viewAllComplaints()

        return res.status(200).json(complaints)

    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }

}

export default viewAllComplaints