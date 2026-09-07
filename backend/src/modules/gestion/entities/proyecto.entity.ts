import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstadosProyectosEnum } from "../enums/estados-proyectos.enum.js";
import { Cliente } from "./cliente.entity.js";
import { Tarea } from "./tarea.entity.js";

@Entity({ name: 'proyectos' })
export class Proyecto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({ type: 'enum', enum: EstadosProyectosEnum })
    estado: EstadosProyectosEnum

    @Column({ name: "id_cliente" })
    idCliente: number

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: "id_cliente" })
    cliente: Cliente

    @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
    tareas: Tarea[]

}
