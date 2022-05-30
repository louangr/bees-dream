import { User } from "../models/User"

export interface IUserContext {
    user: User | undefined
    setUser: (user: User | undefined) => void
} 