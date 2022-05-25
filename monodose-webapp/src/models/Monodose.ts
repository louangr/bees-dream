export interface Monodose {
    id: string;
    beekeeper: {
        firstname: string
        lastname: string
        company: string
    }
    location: string;
    productionstartdate: Date;
    productionenddate: Date;
    dluodate: Date;
    honeyvariety: string;
}