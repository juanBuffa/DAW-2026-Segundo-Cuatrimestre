import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { CreateProyectoDto } from "./create-proyecto.dto.js";
import { EstadosProyectosEnum } from "../../enums/estados-proyectos.enum.js";

export class UpdateProyectoDto extends CreateProyectoDto {

    @ApiProperty({
        enum: EstadosProyectosEnum,
        example: EstadosProyectosEnum.ACTIVO
    })
    @IsEnum(EstadosProyectosEnum)
    @IsNotEmpty()
    estado!: EstadosProyectosEnum;

}
