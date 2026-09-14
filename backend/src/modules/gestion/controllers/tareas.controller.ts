import { Body, Controller, NotImplementedException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UpdateTareaDto } from "../dtos/input/update-tarea.dto.js";
import { CreateTareaDto } from "../dtos/input/create-tarea.dto.js";
import { ApiBearerAuth } from "@nestjs/swagger";
import { TareasService } from "../services/tareas.service.js";
import { AuthGuard } from "../../auth/guards/auth.guard.js";

@Controller('proyectos/:idProyecto/tareas')
export class TareasController {

    constructor(private readonly service: TareasService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearTarea(@Body() dto: CreateTareaDto, @Param('idProyecto') idProyecto: number): Promise<{ id: number }> {

        return await this.service.crearTarea(idProyecto, dto);

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    async actualizarTarea(@Body() dto: UpdateTareaDto, @Param('id') id: number): Promise<void> {
       
       await this.service.editarTarea(id, dto);

    }

}