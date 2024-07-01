export const typeDefs = `#graphql
  type Juego {
    nombre: String!
    genero: String!
    edad: Int!
    empresa: Empresa!
  }
  type Empresa{
    nombre:String!
    juegos:[Juego!]!
  }

  type Query {
    juegos: [Juego!]!
    juego(id: ID!): Juego!
    empresa(id: ID!):Empresa!
    empresas:[Empresa!]!
  }
  type Mutation {
    addjuego(name: String!, genero: String!,edad:Int!,empresa:ID!): Juego!
    deleteJuego(id: ID!): Juego!
    addempresa( name: String!, juegos:[ID]!): Empresa!
    deleteEmpresa(id:ID!):Empresa!
  }
`;
