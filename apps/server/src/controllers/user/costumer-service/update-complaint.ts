import { Request, Response } from 'express'
import CustomerService from '../../../types/users/customer-service';

const updateComplaints = async (req: Request, res: Response) => {
    try {

        const user = req.user as CustomerService
        const { complaintId, status } = req.body

        const updateComplaint = await user.updateStatus(complaintId, status)

        return res.status(200).json({ message: 'complaint status updated' })

    } catch (e: any) {

        return res.status(200).json({ message: e.message })
    }
}

export default updateComplaints