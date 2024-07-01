import mongoose from 'mongoose';
import { videojuego } from "../types.ts";
import { generos } from "../types.ts";


const Schema= mongoose.Schema;


const schemajuegos= new Schema({
    nombre:{type:String,required:true},
    genero:{type:String,enum:generos,required:true},
    edad:{type:Number,required:true},
    empresa:{type:mongoose.Types.ObjectId,required:true},
},
{timestamps:true})


export type tipojuego= mongoose.Document & (videojuego)

schemajuegos.post("findOneAndDelete",async function (doc) {
    const empresa = await mongoose.models.Empresas.findById(doc.empresa)
    empresa.juegos.pop(doc._id)
    return true;
})

export const Modelojuego= mongoose.model<tipojuego>("Juegos",schemajuegos)