import { Request, Response } from 'express'
import Customer from '../../types/users/customer';
import CustomerService from '../../types/users/customer-service';

const viewComplaint = async (req: Request, res: Response) => {
  try {

    const role = req.user?.role?.toUpperCase()
    const { complaintId } = req.params

    if (role === 'CUSTOMER') {
      const user = req.user as Customer

      const complaint = await user.viewComplaint(complaintId)

      return res.status(200).json(complaint)
    }

    if (role === 'CUSTOMER_SERVICE') {
      const user = req.user as CustomerService

      const complaint = await user.viewComplaint(complaintId)

      return res.status(200).json(complaint)
    }

  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export default viewComplaint
