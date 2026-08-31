import { Body, Controller, Get, NotImplementedException, Param, Post, Put, Query } from "@nestjs/common";
import { CreateClienteDto } from "../dtos/input/create-cliente.dto.js";
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto.js";
import { UpdateClienteDto } from "../dtos/input/update-cliente.dto.js";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum.js";

@Controller('clientes')
export class ClientesController {

    constructor() { }

    @ApiBearerAuth()
    @Post()
    async crearCliente(@Body() dto: CreateClienteDto): Promise<{ id: number }> {
        throw new NotImplementedException()
    }
    
    @ApiBearerAuth()
    @Put(":id")
    async actualizarCliente(@Param("id") id: number, @Body() dto: UpdateClienteDto): Promise<void> {
        throw new NotImplementedException()
    }   

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListClienteDTO, isArray: true })
    @ApiQuery({
        name: 'estado',
        required: false,
        enum: EstadosClientesEnum
    })
    @Get()
    async obtenerClientes(@Query("estado") estado: EstadosClientesEnum): Promise<ListClienteDTO[]> {
        throw new NotImplementedException()
    }

}