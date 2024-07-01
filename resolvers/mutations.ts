import { generos } from "../types.ts"
import { tipojuego } from "../db/juegos.ts"
import { Modeloempresa } from '../db/empresas.ts';
import { GraphQLError } from "graphql";
import { Modelojuego } from '../db/juegos.ts';
import { tipoempresa } from '../db/empresas.ts';
import mongoose from 'mongoose';


export const Mutation={

    addjuego: async(_:unknown,
        args:{name:string,genero:generos,edad:number,empresa:string}
    ):Promise<tipojuego>=>{
        const empresa= await Modeloempresa.findById(args.empresa)
        if(!empresa){
            throw new GraphQLError("No existe empresa con ese id")
        }
        const juegonombre= await Modelojuego.findOne({nombre:args.name})
        if(juegonombre){
            throw new GraphQLError(`Ya existe un juego con este nombre: ${args.name}`)

        }
        const nuevojuego= new Modelojuego({
            nombre:args.name,
            genero:args.genero,
            edad:args.edad,
            empresa:args.empresa
        })
        empresa.juegos.push(nuevojuego._id)
        await empresa.save()
        await nuevojuego.save()
        return nuevojuego
    },
    addempresa: async(_:unknown,
        args:{name:string,juegos:string[]}
    ):Promise<tipoempresa>=>{
        if(args.juegos.length>0){
            for (let index = 0; index < args.juegos.length; index++) {
              const juegoexiste= await Modelojuego.findById(args.juegos[index])
                if(!juegoexiste){
                    throw new GraphQLError(`Juego no existente en la posicion ${index}`)
                }
            }
        }
        const nuevaempresa= new Modeloempresa({
            nombre:args.name,
            juegos:args.juegos
        })
        await nuevaempresa.save()
        return nuevaempresa;
    },
    deleteJuego: async (_:unknown,
        args:{id:string}
    ):Promise<tipojuego>=>{
        const juegoeliminado= await Modelojuego.findByIdAndDelete(args.id)
        if(!juegoeliminado){
            throw new  GraphQLError(`Juego no encontrado con id: ${args.id}`)
        }
        return juegoeliminado;
    },
    deleteEmpresa: async (_:unknown,
        args:{id:string}
    ):Promise<tipoempresa>=>{
        const juegoeliminado= await Modeloempresa.findByIdAndDelete(args.id)
        if(!juegoeliminado){
            throw new  GraphQLError(`Empresa no encontrada con id: ${args.id}`)
        }
        return juegoeliminado;
    },
}