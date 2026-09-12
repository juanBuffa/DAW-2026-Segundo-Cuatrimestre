import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstadosTareasEnum } from "../enums/estados-tareas.enum.js";
import type { Proyecto } from "./proyecto.entity.js";

@Entity({ name: "tareas" })
export class Tarea {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @Column({ type: 'enum', enum: EstadosTareasEnum })
    estado: EstadosTareasEnum

    @Column({ name: 'id_proyecto' })
    idProyecto: number

    @ManyToOne("Proyecto")
    @JoinColumn({ name: "id_proyecto" })
    proyecto: Proyecto


}