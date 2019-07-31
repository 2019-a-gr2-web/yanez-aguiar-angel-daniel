import {IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {EstudianteEntity} from "../../Padre/padre.entity";


export class ProductosCreateDto{

    @IsEmpty()
    materiaId?:number;

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsString()
    @IsOptional()
    codigo:string;

    @IsString()
    @IsNotEmpty()
    descripcion:string;

    @IsBoolean()
    @IsNotEmpty()
    activo:boolean;
    
    @IsDate()
    @IsOptional()
    fechaCracion:Date;

    @IsNumber()
    @IsOptional()
    numeroHorasPorSemana:number;

    @IsNotEmpty()
    TiendaId:EstudianteEntity;

}