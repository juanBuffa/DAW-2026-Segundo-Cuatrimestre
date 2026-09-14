import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, Version } from "@nestjs/common";
import { CreateClienteDto } from "../dtos/input/create-cliente.dto.js";
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto.js";
import { UpdateClienteDto } from "../dtos/input/update-cliente.dto.js";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum.js";
import { ClientesService } from "../services/clientes.service.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";

@Controller('clientes')
export class ClientesController {

    constructor(private readonly service: ClientesService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearCliente(@Body() dto: CreateClienteDto): Promise<{ id: number }> {
        return await this.service.crearCliente(dto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(":id")
    async actualizarCliente(@Param("id") id: number, @Body() dto: UpdateClienteDto): Promise<void> {
        await this.service.actualizarCliente(id, dto);
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListClienteDTO, isArray: true })
    @ApiQuery({
        name: 'estado',
        required: false,
        enum: EstadosClientesEnum
    })
    @UseGuards(AuthGuard)
    @Version("1")
    @Get()
    async obtenerClientes(@Query("estado") estado: EstadosClientesEnum): Promise<ListClienteDTO[]> {
        return await this.service.obtenerClientes(estado);
    }

}