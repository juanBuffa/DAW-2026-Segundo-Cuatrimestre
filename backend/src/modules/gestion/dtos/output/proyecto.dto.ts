import { ApiProperty } from "@nestjs/swagger";
import { EstadosProyectosEnum } from "../../enums/estados-proyectos.enum.js";
import { ListTareaDTO } from "./list-tarea.dto.js";

export class ProyectoDTO {

    @ApiProperty()
    nombre!: string;

    @ApiProperty()
    estado!: EstadosProyectosEnum;

    @ApiProperty()
    cliente!: string;

    @ApiProperty()
    tareas!: ListTareaDTO[];

}