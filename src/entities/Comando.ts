import {Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ComandoDto } from './dto/ComandoDto';
import { EstadoEnum } from '../configs/Config.enum';
import { getFecha } from '../configs/General.functions';

@Entity('comando')
export class Comando{
    
    @PrimaryGeneratedColumn({name:"ID"})
    public id: number

    @Column({name:"DETALLE",length:200})
    detalle:string

    @Column({name:"TIPO",length:200})
    tipo:string

    // @Column({
    // transformer: {
    //     to: (value: string) => Buffer.from(value),
    //     from: (value: Buffer) => value.toString()
    // },name:"SONIDO", default: getFecha(new Date())
    // })
    @Column({name: "SONIDO"})
    sonido: string;

    @Column({name: "IMAGEN"})
    imagen: string;
    
    // @Column({
    // transformer: {
    //     to: (value: string) => Buffer.from(value),
    //     from: (value: Buffer) => value.toString()
    // },name:"IMAGEN", default: getFecha(new Date())
    // })
    // imagen: string;

    @CreateDateColumn({name:"FECHA_REGISTRO"})
    fechaRegistro:Date    

    @Column({name:"FECHA_MODIFICACION",nullable:true})
    fechaModificacion:Date
    
    @Column({name:"USUARIO_REGISTRO",length:50})
    usuarioRegistro:string

    @Column({name:"USUARIO_MODIFICACION", length:50,nullable:true})
    usuarioModificacion:string
    
    constructor(params: ComandoDto = {} as ComandoDto){
        this.detalle=params.detalle;
        this.tipo = params.tipo;
    }
}