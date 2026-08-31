import { Body, Controller, Get, NotImplementedException, Param, Post, Put } from "@nestjs/common";
import { CreateProyectoDto } from "../dtos/input/create-proyecto.dto.js";
import { UpdateProyectoDto } from "../dtos/input/update-proyecto.dto.js";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { ListProyectoDTO } from "../dtos/output/list-proyecto.dto.js";
import { ProyectoDTO } from "../dtos/output/proyecto.dto.js";

@Controller('proyectos')
export class ProyectosController {

    constructor() { }

    @ApiBearerAuth()
    @Post()
    async crearProyecto(@Body() dto: CreateProyectoDto): Promise<{ id: number }> {

       throw new NotImplementedException()

    }

    @ApiBearerAuth()
    @Put(':id')
    async actualizarProyecto(@Body() dto: UpdateProyectoDto, @Param('id') id: number): Promise<void> {

        throw new NotImplementedException()
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListProyectoDTO, isArray: true })
    @Get()
    async obtenerProyectos(): Promise<ListProyectoDTO[]> {

        throw new NotImplementedException()
    }

    @ApiBearerAuth()
    @Get(':id')
    async obtenerProyecto(@Param('id') id: number): Promise<ProyectoDTO> {

        throw new NotImplementedException()
    }
}