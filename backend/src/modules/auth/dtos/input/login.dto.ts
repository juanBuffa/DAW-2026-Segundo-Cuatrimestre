import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDTO{

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message: "Se debe indicar el nombre"})
    nombre: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    clave: string
}