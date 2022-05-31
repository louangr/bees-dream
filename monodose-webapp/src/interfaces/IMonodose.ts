interface IApiculteur{
    nom: string,
    prenom: string,
    entreprise: string,
    age: number
}

export default interface IMonodose{
    id: number,
    apiculteur: IApiculteur,
    localisation: string,
    dateProduction: string,
    dateDLUO: string,
    variety: string
}