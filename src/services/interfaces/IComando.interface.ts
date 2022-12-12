import {MessageResponse} from '../../entities/dto/GeneralDto';

export default interface IComando {
    test: (authSession:any) => Promise<any>;
    listAll: (limit: number, page: number) => Promise<any>;
    create: (dto: any) => Promise<any>;
    edit: (id:number,dto: any)=> Promise<MessageResponse>;
}