import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto"
import { EstadoEnum } from "../configs/Config.enum"
import { ComandoDto } from "../entities/dto/ComandoDto";
import { ObjectID } from "mongodb";
import { Comando } from "../entities/Comando";


class ComandoRepository {
    private repository = MysqlDataSource.getRepository(Comando);

    public async  findByDto (params: ComandoDto): Promise<ListPaginate |null>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return {
            data: result,
            count: total
        }
    };

    public async  findById (params: number): Promise<Comando | null>{    
        let options={}
        options = {
            where: {
                _id: new ObjectID(params)
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async findByDetalle (detalle: string, tipo:string): Promise<Comando | null>{    
        let options={}
        options = {
            where: {
                detalle: detalle,
                tipo: tipo,
            },
        };
        const result = await this.repository.findOne(options);
        return result
    };

    public async  findByINId (params: string[]): Promise<Comando[]>{    
        let options={}
        options={
            where: {
                firstName: { $in: params },
            },   
        }
            
        const result = await this.repository.find(options);        
        return result
    };
    
    public async  actualizar (id:number, param: ComandoDto){
        const firstUser = await this.repository.update(id,param);
        return firstUser;
    };
    
    public async  delete (params: number): Promise<DeleteResult>{
        const firstUser = await this.repository.delete(params);
        return firstUser;
    };


    public async  listAll (): Promise<ListPaginate>{
        const [result,total] = await this.repository.findAndCount();        
        return {
            data: result,
            count: total
        }
    };

    public async listByTipo (tipo:string): Promise<ListPaginate>{
        const [result,total] = await this.repository.findAndCount({where:{
            tipo:tipo
        }});        
        return {
            data: result,
            count: total
        }
    };

    public async listTipo (): Promise<any>{
        const result =await this.repository.createQueryBuilder()
            .select('tipo')
            .distinct(true)
            .getRawMany();
        const aTipo = result.map(oTipo=>{
            return oTipo.tipo
        });
        return aTipo;
    };

    public async save(params: Comando): Promise<Comando> {
        const oRol = await this.repository.save(params);
        return oRol;
    };

}
export default new ComandoRepository();