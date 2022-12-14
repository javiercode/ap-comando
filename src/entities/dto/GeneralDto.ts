export interface JwtPayload {
    username: string,
    name: string,
    rol: string[],
    aRolId: string[],
    aSucursal: number[],
    sucursal: number,
    departamento: number,
    activo: Boolean,
}

export interface MessageResponse {
    success: boolean,
    message: string,
    code: number,
    data?:any,
    total?:number
}

export interface LoginResponce {
    success: boolean,
    message: string,
    token: string,
}

export interface ListPaginate {
    data: any[],
    count: number
}
