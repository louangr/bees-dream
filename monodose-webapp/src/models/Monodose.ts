export interface Monodose {
    id: number
    beekeeper: {
        firstname: string
        lastname: string
        company: string
        age?: number
    }
    dates: {
        dluo: string
        startofproduction: string
        endofproduction: string
    }
    location: string
    honeyvariety: string
}