import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {materiaEntity} from "./materia.entity";
import {detalleEntity} from "./detalle.entity";


@Entity('estudiante') // Nombre tabla
export class estudianteEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'nombres',
    })
    nombres: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'apellidos',
    })
    apellidos: string;

    @Column({
        type: 'date',
        default: '2019-06-19',
        name: 'fechaNacimiento',
    })
    fechaNacimiento: Date;

    @Column({
        type: 'int',
        name: 'semestreActual',
    })
    semestreActual: number;

    @Column({
        type: 'bool',
        name: 'graduado',
    })
    graduado: boolean;


    @OneToMany(type => materiaEntity, materia => materia.estudianteId)
    materias: materiaEntity[];

    @OneToMany(type => detalleEntity, detalle => detalle.estudianteId)
    detalles: detalleEntity[];

}