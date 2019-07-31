import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {facturaEntity} from "./factura.entity";
import {estudianteEntity} from "./estudiante.entity";

@Entity('detalle') // Nombre tabla
export class detalleEntity {

    @PrimaryGeneratedColumn()
    idDetalle:number;

    @Column({
        type: 'int',
        name: 'cantidad',
    })
    cantidad: number;

    @ManyToOne(type => facturaEntity, factura => factura.detalles)
    facturaId: facturaEntity;

    @ManyToOne(type => estudianteEntity, estudiante => estudiante.detalles)
    estudianteId: estudianteEntity;
}