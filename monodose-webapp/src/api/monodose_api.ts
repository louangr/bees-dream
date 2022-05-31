import axios from "axios";
import {Monodose} from "../models/Monodose";

let data: Monodose;

const fetchInfoMonodose = async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id")
    const URI:string = "http://167.99.83.46:8080/monodose/" + id

  try {  
    const request = await axios.get(URI);
    const result = request.data;
    data = {
        id: result.id,
        beekeeper: {
            firstname: result.beekeeper.firstname,
            lastname: result.beekeeper.lastname,
            company: result.beekeeper.company,
            age: 21
            },
            dates: {
                dluo: result.dates.dluo,
                startofproduction: result.dates.startofproduction,
                endofproduction: result.dates.endofproduction
            },
            location:  result.location,
            honeyvariety: 'acacia'
      }

  } catch (err) {
    console.warn("Problème lors du fetch à l'api monodose : ", err);
  }

  return data;
};

export default fetchInfoMonodose;
