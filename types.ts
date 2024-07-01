

export type videojuego={
    nombre:string,
    genero:generos,
    edad:number,
    empresa:empresa,
}

export type empresa={
    nombre:string,
    juegos:[videojuego]
}

export enum generos{
    accion,
    RPG,
    estrategia,
    superviviencia
}