import { User } from '../api/models/User'

export interface IUserContext {
    user: User | undefined
    setUser: (user: User | undefined) => void
} 