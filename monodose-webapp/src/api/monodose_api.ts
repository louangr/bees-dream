import axios from "axios";
import IMonodose from "../interfaces/IMonodose";

let data: IMonodose;

const fetchInfoMonodose = async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id")
    const URI:string = "http://167.99.83.46:8080/monodose/" + id

  try {  
    const request = await axios.get(URI);
    const result = request.data;
    data = {
        id: result.id,
        apiculteur: {
            prenom: result.beekeeper.firstname,
            nom: result.beekeeper.lastname,
            entreprise: result.beekeeper.company,
            age:21
        },
        localisation: result.location,
        dateProduction: result.dates.startofproduction,
        dateDLUO: result.dates.dluo,
        variety: 'Acacia'
      }

  } catch (err) {
    console.warn("Problème lors du fetch à l'api monodose : ", err);
  }

  return data;
};

export default fetchInfoMonodose;
