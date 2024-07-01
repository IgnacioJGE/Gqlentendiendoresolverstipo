import mongoose from "mongoose"
import { GraphQLError } from "graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { typeDefs } from "./gql/schema.ts";
import { Mutation } from "./resolvers/mutations.ts";
import { Query } from "./resolvers/query.ts";
import { Empresa } from './resolvers/empresa.ts';
import { Juego } from './resolvers/juegos.ts';




const env=await load()
const MONGO_URL = Deno.env.get("MONGO_URL")||env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("Please provide a MongoDB connection string");
}

// Connect to MongoDB
await mongoose.connect(MONGO_URL);

console.info("🚀 Connected to MongoDB");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Empresa,
    Juego
  },
});

const { url } = await startStandaloneServer(server,{listen:{port:3000,},});
console.log(`🚀 Server ready at ${url}`);