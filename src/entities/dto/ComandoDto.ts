export interface ComandoDto {
    detalle:string,
    tipo:string,
    sonido:string,
    imagen:string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface ComandoEditDto {
    detalle:string,
    tipo:string,
    sonido:string,
    imagen:string,
    usurioModificacion?:string,
    fechaModificacion?:Date 
}

// export const EquipoRegex: EquipoDto = {
//     detalle: "^[a-zA-Z0-9 ]{3,300}$",
// };