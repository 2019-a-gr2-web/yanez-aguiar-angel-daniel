import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MateriaEntity } from "../Hijo/hijo.entity";

@Entity('Estudiante')
export class EstudianteEntity{
    @PrimaryGeneratedColumn()
    estudianteId:number;

    @Column({
        length:100,
    })
    nombres:string;

    @Column({
        length:100,
    })
    apellidos:string;

    @Column({
        default:'2019-07-30',
    })
    fechaNacimiento:Date;

    @Column({
        length:2,
    })
    semestreActual: string; //number se sale del rango

    @Column({
        default:true,
    })
    graduado: boolean
    
    @OneToMany(
        type => MateriaEntity,
        producto => producto.TiendaId
        )
        productos:MateriaEntity[];
    
}