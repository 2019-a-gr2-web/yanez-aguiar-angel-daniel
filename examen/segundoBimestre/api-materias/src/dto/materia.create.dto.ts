import {IsEmpty, IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate} from "class-validator";

export class MateriaCreateDto {
    @IsEmpty()
    id:number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    codigo: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsBoolean()
    activo: boolean;

    @IsNotEmpty()
    @IsDate()
    fechaCreacion: Date;

    @IsNotEmpty()
    @IsNumber()
    numeroHorasPorSemana:number;

    @IsNotEmpty()
    @IsNumber()
    precio:number;

    @IsNumber()
    @IsNotEmpty()
    estudianteId: number;

}