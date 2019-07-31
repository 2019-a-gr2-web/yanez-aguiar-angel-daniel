export interface Estudiante {
    id?:number;
    nombres:string;
    apellidos:string;
    fechaNacimiento:Date;
    semestreActual:number;
    graduado:boolean;
}