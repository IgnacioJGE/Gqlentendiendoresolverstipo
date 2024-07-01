import mongoose from "mongoose"
import { empresa } from '../types.ts';


const Schema= mongoose.Schema


const schemaempresa= new Schema({
    nombre:{type:String,required:true},
    juegos:{type:[mongoose.Types.ObjectId],required:true}

},
{timestamps:true})


export type tipoempresa= mongoose.Document & (empresa)

schemaempresa.post("findOneAndDelete",async function(doc){
     await mongoose.models.Juegos.deleteMany(doc.juegos)
     return true
})

export const Modeloempresa= mongoose.model<tipoempresa>("Empresas",schemaempresa)