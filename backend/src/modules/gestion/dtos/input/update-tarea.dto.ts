import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { EstadosTareasEnum } from "../../enums/estados-tareas.enum.js";
import { CreateTareaDto } from "./create-tarea.dto.js";

export class UpdateTareaDto extends CreateTareaDto {

    @ApiProperty({ enum: EstadosTareasEnum, example: EstadosTareasEnum.PENDIENTE })
    @IsEnum(EstadosTareasEnum)
    @IsNotEmpty()
    estado!: EstadosTareasEnum;

}
