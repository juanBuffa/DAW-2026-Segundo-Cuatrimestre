import { InjectRepository } from "@nestjs/typeorm";
import { CreateProyectoDto } from "../dtos/input/create-proyecto.dto.js";
import { Proyecto } from "../entities/proyecto.entity.js";
import { Repository, In } from "typeorm";
import { EstadosProyectosEnum } from "../enums/estados-proyectos.enum.js";
import { UpdateProyectoDto } from "../dtos/input/update-proyecto.dto.js";
import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { ListProyectoDTO } from "../dtos/output/list-proyecto.dto.js";
import { ProyectoDTO } from "../dtos/output/proyecto.dto.js";
import { ListTareaDTO } from "../dtos/output/list-tarea.dto.js";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto.js";
import type { ClientesService } from "./clientes.service.js";

@Injectable()
export class ProyectosService {

    constructor(@InjectRepository(Proyecto) private readonly repository: Repository<Proyecto>,
        @Inject(forwardRef(() => "CLIENTES_SERVICE")) private readonly clientesService: ClientesService) { }

    async crearProyecto(dto: CreateProyectoDto): Promise<{ id: number }> {

        const proyecto: Proyecto = this.repository.create(dto);
        proyecto.estado = EstadosProyectosEnum.ACTIVO;

        const clienteActivo: boolean = await this.clientesService.existeClienteActivoPorId(dto.idCliente);

        if (!clienteActivo) {
            throw new BadRequestException('Se debe especificar un cliente activo para el proyecto');
        }

        await this.repository.save(proyecto);
        return { id: proyecto.id };
    }

    async actualizarProyecto(id: number, dto: UpdateProyectoDto): Promise<void> {

        const proyecto: Proyecto | null = await this.repository.findOne({ where: { id } });

        if (!proyecto) {
            throw new BadRequestException('Proyecto no encontrado');
        }

        const clienteActivo: boolean = await this.clientesService.existeClienteActivoPorId(dto.idCliente);
        
        if (!clienteActivo) {
            throw new BadRequestException('Se debe especificar un cliente activo para el proyecto');
        }

        this.repository.merge(proyecto, dto);

        await this.repository.save(proyecto);
    }

    async obtenerProyectos(): Promise<ListProyectoDTO[]> {

        const proyectos: Proyecto[] = await this.repository.find({ relations: {cliente: true}, order: { id: 'ASC' } });

        const dtoList: ListProyectoDTO[] = [];

        for (const p of proyectos) {
            const dto = new ListProyectoDTO();
            dto.id = p.id;
            dto.nombre = p.nombre;
            dto.estado = p.estado;
            dto.cliente = new ListClienteDTO();
            dto.cliente.id = p.cliente.id
            dto.cliente.nombre = p.cliente.nombre;
            dto.cliente.estado = p.cliente.estado
            dtoList.push(dto);
        }

        return dtoList;

    }

    async obtenerProyecto(id: number): Promise<ProyectoDTO> {

        const proyecto: Proyecto | null = await this.repository.findOne({ where: { id }, relations: {cliente: true, tareas: true}, order: { tareas: { id: 'ASC' } } });

        if (!proyecto) {
            throw new BadRequestException('Proyecto no encontrado');
        }

        const dto = new ProyectoDTO();
        dto.nombre = proyecto.nombre;
        dto.estado = proyecto.estado;
        dto.cliente = proyecto.cliente.nombre;
        const tareas: ListTareaDTO[] = [];
        for (const t of proyecto.tareas) {
            const tareaDto = new ListTareaDTO();
            tareaDto.id = t.id;
            tareaDto.descripcion = t.descripcion;
            tareaDto.estado = t.estado;
            tareas.push(tareaDto);
        }

        dto.tareas = tareas;

        return dto;

    }

    async existeProyectoPorIdCliente(idCliente: number): Promise<boolean> {

        const existe: boolean = await this.repository.exists({ where: { cliente: { id: idCliente }, estado: In([EstadosProyectosEnum.ACTIVO, EstadosProyectosEnum.FINALIZADO]) } });
        return existe;
    }

}