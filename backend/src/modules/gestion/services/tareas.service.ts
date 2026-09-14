import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tarea } from "../entities/tarea.entity.js";
import { Repository } from "typeorm";
import { CreateTareaDto } from "../dtos/input/create-tarea.dto.js";
import { EstadosTareasEnum } from "../enums/estados-tareas.enum.js";
import { UpdateTareaDto } from "../dtos/input/update-tarea.dto.js";

@Injectable()
export class TareasService {

    constructor(@InjectRepository(Tarea) private readonly repository: Repository<Tarea>) { }

    async crearTarea(idProyecto: number, dto: CreateTareaDto): Promise<{ id: number }> {

        const tarea: Tarea = this.repository.create(dto);

        tarea.estado = EstadosTareasEnum.PENDIENTE

        tarea.idProyecto = idProyecto

        await this.repository.save(tarea);

        return { id: tarea.id }

    }

    async editarTarea(idTarea: number, dto: UpdateTareaDto): Promise<void> {

        const tarea: Tarea | null = await this.repository.findOne({
            where: {
                id: idTarea
            }
        });

        if (!tarea){
            throw new BadRequestException("La tarea indicada no existe");
        }

        this.repository.merge(tarea, dto);

        await this.repository.save(tarea);

    }

}