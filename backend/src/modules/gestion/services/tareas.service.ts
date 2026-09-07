import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tarea } from "../entities/tarea.entity.js";
import { Repository } from "typeorm";
import { CreateClienteDto } from "../dtos/input/create-cliente.dto.js";
import { CreateTareaDto } from "../dtos/input/create-tarea.dto.js";
import { EstadosTareasEnum } from "../enums/estados-tareas.enum.js";
import { UpdateTareaDto } from "../dtos/input/update-tarea.dto.js";

@Injectable()
export class TareaService {

    constructor(@InjectRepository(Tarea) private readonly repository: Repository<Tarea>) { }

    async crearTarea(idProyecto: number, dto: CreateTareaDto): Promise<{ id: number }>{

        const tarea: Tarea = this.repository.create(dto);

        tarea.estado = EstadosTareasEnum.PENDIENTE

        tarea.idProyecto = idProyecto

        await this.repository.save(tarea);

        return { id: tarea.id }

    }

    async editarTarea(idTarea: number, dto: UpdateTareaDto): Promise<void>{
        
        const tarea: Tarea = this.repository.findOne({
            
        });

    }

}