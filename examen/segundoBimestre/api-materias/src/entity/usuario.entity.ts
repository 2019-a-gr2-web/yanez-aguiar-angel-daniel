import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {rolEntity} from "./rol.entity";
import {materiaEntity} from "./materia.entity";
import {facturaEntity} from "./factura.entity";

@Entity('usuario') // Nombre tabla
export class usuarioEntity {

    @PrimaryGeneratedColumn()
    idUsuario:number;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'nombre',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'direccion',
    })
    direccion: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'telefono',
    })
    telefono: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'cedula',
    })
    cedula: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'email',
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'password',
    })
    password: string;

    @ManyToOne(type => rolEntity, rol => rol.usuarios)
    rolId: rolEntity;

    @OneToMany(type => facturaEntity, factura => factura.usuarioId)
    facturas: facturaEntity[];
}