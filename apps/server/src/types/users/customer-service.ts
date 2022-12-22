import User from './user';
import UserRole from './user-role';
import { PrismaClient } from '@prisma/client';
import generateId from '../../lib/generate-id';

class CustomerService extends User {

  constructor(email: string, password?: string, name?: string) {
    super(UserRole.CUSTOMER_SERVICE, email, password, name)
  }

  async viewAllComplaints(): Promise<any> {
    const prisma = new PrismaClient()

    const complaints = await prisma.complaint.findMany({
      select: {
        id: true,
        date: true,
        title: true,
        status: true,
        author: {
          select: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc'
      },
    })

    return complaints

  }

  async viewComplaint(complaintId: string): Promise<any> {
    const prisma = new PrismaClient()

    const complaint = await prisma.complaint.findUnique({
      where: {
        id: complaintId,
      },
      select: {
        title: true,
        text: true,
        date: true,
        status: true,
        author: {
          select: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
        replies: {
          select: {
            text: true,
            date: true,
            author: {
              select: {
                email: true,
                name: true,
              },
            },
            customerId: true,
          },
          orderBy: {
            date: 'asc'
          },
        },
      },
    })

    if (!complaint)
      throw new Error('Cannot find this complaint')

    return complaint
  }

  async updateStatus(complaintId: string, status: boolean): Promise<any> {
    const prisma = new PrismaClient()

    const complaint = await prisma.complaint.update({
      where: {
        id: complaintId
      },
      data: {
        status: status,
      },
    })

    if (!complaint)
      throw new Error('Cannot find this complaint')

    return (complaint)
  }

  async writeReply(text: string, complaintId: string): Promise<any> {
    const prisma = new PrismaClient()

    const reply = await prisma.reply.create({
      data: {
        text: text,
        author: {
          connect: {
            id: this.id
          },
        },
        complaint: {
          connect: {
            id: complaintId
          },
        },
        customerService: {
          connect: {
            id: this.id
          },
        },
      },
    })

    return reply

  }

  async fetchData(): Promise<any> {
    const prisma = new PrismaClient()

    const customerService = await prisma.customerService.findUnique({
      where: {
        id: this.id,
      },
    })

    if (!customerService)
      throw new Error('User is not a customer sevice employee')

    return this
  }


  async create(): Promise<any> {
    const prisma = await new PrismaClient()

    const costumerService = await prisma.customerService.create({
      data: {
        id: this.id,
      },
    })

    return this
  }

}

export default CustomerService