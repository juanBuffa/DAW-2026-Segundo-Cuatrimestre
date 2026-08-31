import { ApiProperty } from "@nestjs/swagger";
import { EstadosTareasEnum } from "../../enums/estados-tareas.enum.js";

export class ListTareaDTO {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    descripcion!: string;

    @ApiProperty()
    estado!: EstadosTareasEnum;

}