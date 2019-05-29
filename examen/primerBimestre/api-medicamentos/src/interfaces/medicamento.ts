export interface Medicamento {
    id?:number;
    gramosAIngerir:number;
    nombre:string;
    composicion:string;
    usadoPara:string;
    fechaCaducidad:Date;
    numeroPastillas:number;
    pacienteId:number;
}