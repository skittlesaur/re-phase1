import UserRole from './user-role';
import generateId from '../lib/generate-id';

abstract class User {
    id: string
    email: string
    password: string
    name: string
    role: UserRole

    constructor(email: string, password: string, name: string, role: UserRole) {
        this.id = generateId()
        this.email = email
        this.password = password
        this.name = name
        this.role = role
    }

    abstract createRecord(): any

    abstract login(): any

}

export default User