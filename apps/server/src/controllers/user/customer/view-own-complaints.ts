import { Request, Response } from 'express'
import Customer from '../../../types/users/customer';

const viewOwnComplaints = async (req: Request, res: Response) => {
    try {

        const user = req.user as Customer

        const complaints = await user.viewOwnComplaints()

        return res.status(200).json(complaints)

    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }
}

export default viewOwnComplaints