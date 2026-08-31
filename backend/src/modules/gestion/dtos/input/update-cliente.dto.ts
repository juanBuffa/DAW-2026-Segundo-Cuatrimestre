import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { CreateClienteDto } from "./create-cliente.dto.js";
import { EstadosClientesEnum } from "../../enums/estados-clientes.enum.js";

export class UpdateClienteDto extends CreateClienteDto {

    @ApiProperty({ enum: EstadosClientesEnum, example: EstadosClientesEnum.ACTIVO })
    @IsEnum(EstadosClientesEnum)
    @IsNotEmpty()
    estado!: EstadosClientesEnum;

}
