import { Request, response, Response } from "express";
import { getAuthUser } from '../configs/TokenMiddleware';
import ComandoService from '../services/Comando.service';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { TypeKeyParamEnum } from "../configs/Config.enum";
import { validateParams } from "../configs/General.functions";
import { ComandoDto, ComandoEditDto } from "../entities/dto/ComandoDto";

class ComandoController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        const result = await ComandoService.test(getAuthUser(req));
        return res.status(200).send(result);
    }

    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result;
        result = await ComandoService.listAll();
        return res.status(200).send(result);
    }

    public async listTipo(req: Request, res: Response) {
        const { tipo } = req.params;
        let result;
        result = await ComandoService.listTipo();
        return res.status(200).send(result);
    }

    public async listByTipo(req: Request, res: Response) {
        const { tipo } = req.params;
        let result;
        result = await ComandoService.listByTipo(tipo);
        return res.status(200).send(result);
    }

    public async create(req: Request, res: Response) {
        const userDto = req.body as ComandoDto;
        const result = await ComandoService.create(userDto);
        return res.status(200).send(result);
    }

    public async edit(req: Request, res: Response) {
        const userDto = req.body as ComandoEditDto;
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        
        if(result.success){
            result = await ComandoService.edit(Number(req.params.id), userDto);
        }
        return res.status(200).send(result);
    }

    public async delete(req: Request, res: Response) {
        let result = validateParams(req.params.id,TypeKeyParamEnum.OBJECT_ID)
        if(result.success){
            result = await ComandoService.desactivar(Number(req.params.id));
        }
        return res.status(200).send(result);
    }
}
export default new ComandoController();