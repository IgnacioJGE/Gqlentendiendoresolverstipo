import { tipojuego } from '../db/juegos.ts';
import { Modeloempresa } from '../db/empresas.ts';





export const Juego={
    empresa: async(juego:tipojuego):Promise<tipoempresa>=>{
        const empresa= await Modeloempresa.findById(juego.empresa)
        return empresa
    }
}