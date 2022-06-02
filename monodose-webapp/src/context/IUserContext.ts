import { Logged } from '../api'
import { User } from '../api/models/User'

export interface IUserContext {
    loggedUser: Logged | undefined
    setLoggedUser: (loggedUser: Logged | undefined) => void
} 