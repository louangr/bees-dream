import { createContext } from "react"
import { IUserContext } from "./IUserContext"

export const UserContext = createContext<IUserContext>({} as IUserContext)