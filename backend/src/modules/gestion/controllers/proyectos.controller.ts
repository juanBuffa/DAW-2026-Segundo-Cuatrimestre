import { Body, Controller, Get, NotImplementedException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateProyectoDto } from "../dtos/input/create-proyecto.dto.js";
import { UpdateProyectoDto } from "../dtos/input/update-proyecto.dto.js";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { ListProyectoDTO } from "../dtos/output/list-proyecto.dto.js";
import { ProyectoDTO } from "../dtos/output/proyecto.dto.js";
import { ProyectosService } from "../services/proyectos.service.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";

@Controller('proyectos')
export class ProyectosController {

    constructor(private readonly service: ProyectosService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearProyecto(@Body() dto: CreateProyectoDto): Promise<{ id: number }> {

       return await this.service.crearProyecto(dto);

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    async actualizarProyecto(@Body() dto: UpdateProyectoDto, @Param('id') id: number): Promise<void> {

        await this.service.actualizarProyecto(id, dto);
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: ListProyectoDTO, isArray: true })
    @UseGuards(AuthGuard)
    @Get()
    async obtenerProyectos(): Promise<ListProyectoDTO[]> {

        return await this.service.obtenerProyectos();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    async obtenerProyecto(@Param('id') id: number): Promise<ProyectoDTO> {

        return await this.service.obtenerProyecto(id);
    }
}