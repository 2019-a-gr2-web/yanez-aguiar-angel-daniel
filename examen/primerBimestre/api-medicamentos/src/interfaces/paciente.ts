export interface Paciente {
    id?:number;
    nombres:string;
    apellidos:string;
    fechaNacimiento:Date;
    hijos:number;
    tieneSeguro:boolean;
}