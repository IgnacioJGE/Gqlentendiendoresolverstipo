import { tipojuego} from "../db/juegos.ts";
import { tipoempresa } from "../db/empresas.ts";
import { Modelojuego } from '../db/juegos.ts';


export const Empresa={
    juegos: async(empresa:tipoempresa):Promise<tipojuego[]>=>{
        const juegos= await Modelojuego.find({empresa:empresa._id})
        return juegos||[]
    }
}