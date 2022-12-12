import { JwtPayload } from '../entities/dto/GeneralDto';
import { ComandoEditDto, ComandoDto } from '../entities/dto/ComandoDto';
import { Comando} from '../entities/Comando';
import ComandoRepository from '../repositories/Comando.Repository';
import { MessageResponse } from '../entities/dto/GeneralDto'
import { getFecha } from '../configs/General.functions';
import IComando from './interfaces/IComando.interface';


class ComandoService implements IComando {

    async test(authSession: JwtPayload): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos!", code: 0 };
        return res;
    }

    async listAll(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            //const b64 = Buffer.from(await data).toString('base64');
            const result = await ComandoRepository.listAll();
            const data = result.data .map(comando=>{
                comando.imagen = Buffer.from(comando.imagen).toString('base64');
                comando.sonido = Buffer.from(comando.sonido).toString('base64');
                return comando
            })
            res.data = data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = result.count || 0;
        } catch (error) {
            console.error(error);
        }

        return res;
    }

    async listByTipo(tipo:string): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            const query = tipo==""? await ComandoRepository.listAll(): await ComandoRepository.listByTipo(tipo);
            const data = query.data .map(comando=>{
                comando.imagen = Buffer.from(comando.imagen).toString('base64');
                comando.sonido = Buffer.from(comando.sonido).toString('base64');
                return comando
            });
            
            res.data = data;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.count || 0;
        } catch (error) {
            console.error(error);
        }

        return res;
    }

    async listTipo(): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await ComandoRepository.listTipo();
            res.data = query;
            res.success = true;
            res.message = "Obtención exitosa";
            res.total = query.length;
        } catch (error) {
            console.error(error);
        }

        return res;
    }

    async edit(id: number, dto: ComandoEditDto): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const userDtoFind = await ComandoRepository.findById(id) as Comando;
            
            if (!userDtoFind) {
                res.message = "Comando no encontrado!";
            } else {
                dto.fechaModificacion = getFecha(new Date());
                await ComandoRepository.actualizar(id, dto);
                res.data = dto;
                res.success = true;
                res.message = "Comando actualizado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }

    async create(dto: ComandoDto): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            dto.detalle = dto.detalle.toUpperCase();
            let oComando = new Comando(dto);
            oComando.sonido = Buffer.from(dto.sonido).toString('base64')
            oComando.imagen = Buffer.from(dto.imagen).toString('base64')
            const oEquipoFind = await ComandoRepository.findByDetalle(dto.detalle, dto.tipo);
            if(!oEquipoFind){
                oComando = await ComandoRepository.save(oComando);
                res.success = true;
                res.message = "Comando registrado";
                res.data = oComando;
            }else{
                res.message = "Comando duplicado";
            }
            
        } catch (error) {
            console.error(error);
        }
        return res;
    }

    async desactivar(idUser: number): Promise<MessageResponse> {
        const res: MessageResponse = { success: false, message: "Error de eliminación", code: 0 };
        try {
            const userDtoFind = await ComandoRepository.findById(idUser);
            if (userDtoFind) {
                ComandoRepository.delete(idUser);
                res.success = true;
                res.message = "Comando eliminado";

            } else {
                res.message = "Comando no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res;
    }
}

export default new ComandoService();