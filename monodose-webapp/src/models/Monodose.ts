export interface Monodose {
    id: string
    beekeeper: {
        firstname: string
        lastname: string
        company: string
    }
    dates: {
        dluo: string
        startofproduction: string
        endofproduction: string
    }
    location: string
    honeyvariety: string
}