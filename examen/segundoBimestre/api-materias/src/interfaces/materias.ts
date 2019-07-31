export interface Materias {
    id?:number;
    nombre:string;
    codigo:string;
    descripcion:string;
    activo:boolean;
    fechaCreacion:Date;
    numeroHorasPorSemana:number;
    precio:number;
    estudianteId:number;
}