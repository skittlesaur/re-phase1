import IFactory from './ifactory'
import User from '../types/users/user'
import UserRole from '../types/users/user-role'
import Customer from '../types/users/customer'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import CustomerService from '../types/users/customer-service';

interface UserProps {
  email: string
  password?: string
  name?: string
}

class UserFactor implements IFactory {
  create(role: UserRole, props: UserProps): User {
    switch (role) {
      case UserRole.CUSTOMER:
        return new Customer(props.email, props.password, props.name)
      case UserRole.CUSTOMER_SERVICE:
        return new CustomerService(props.email, props.password, props.name)
      default:
        throw new Error('Invalid user role')
    }
  }
}

export default UserFactor