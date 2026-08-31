import { Body, Controller, NotImplementedException, Param, Post, Put } from "@nestjs/common";
import { UpdateTareaDto } from "../dtos/input/update-tarea.dto.js";
import { CreateTareaDto } from "../dtos/input/create-tarea.dto.js";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('proyectos/:idProyecto/tareas')
export class TareasController {

    constructor() { }

    @ApiBearerAuth()
    @Post()
    async crearTarea(@Body() dto: CreateTareaDto, @Param('idProyecto') idProyecto: number): Promise<{ id: number }> {

        throw new NotImplementedException()

    }

    @ApiBearerAuth()
    @Put(':id')
    async actualizarTarea(@Body() dto: UpdateTareaDto, @Param('id') id: number): Promise<void> {
       
       throw new NotImplementedException()

    }

}