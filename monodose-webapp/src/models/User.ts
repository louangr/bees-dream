export enum Role {
    Admin = 'admin',
    BeeKeeper = 'beeKeeper'
}

export interface User {
    login: string
    password: string
    firstname: string
    lastname: string
    company: string
    role: Role
}