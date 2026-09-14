import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum.js";
import type { Proyecto } from "./proyecto.entity.js";

@Entity({ name: "clientes" })
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "nombre" })
    nombre: string

    @Column({ type: 'enum', enum: EstadosClientesEnum })
    estado: EstadosClientesEnum

    @OneToMany(("Proyecto"), (proyecto: Proyecto) => proyecto.cliente)
    proyectos: Proyecto[]
}

