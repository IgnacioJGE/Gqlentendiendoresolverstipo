import { tipoempresa } from '../db/empresas.ts';
import { Modeloempresa } from '../db/empresas.ts';
import { GraphQLError } from 'graphql';
import { tipojuego } from '../db/juegos.ts';
import { Modelojuego } from '../db/juegos.ts';



export const Query ={
    empresa: async (_:unknown,
        args:{id:string}
    ):Promise<tipoempresa>=>{
        const existeempresa= await Modeloempresa.findById(args.id)
        if(!existeempresa){
            throw new GraphQLError(`No existe empresa con ese id:${args.id}`)
        }
        return existeempresa
    },
    juego: async (_:unknown,
        args:{id:string}
    ):Promise<tipojuego>=>{
        const existejuego= await Modelojuego.findById(args.id)
        if(!existejuego){
            throw new GraphQLError(`No existe juegos con ese id:${args.id}`)

        }
        return existejuego
    },
    empresas: async():Promise<tipoempresa[]>=>{
        const empresas= await Modeloempresa.find()
        return empresas||[]
    },
    juegos: async():Promise<tipojuego[]>=>{
        const juegos= await Modelojuego.find()
        return juegos||[]
    }
}