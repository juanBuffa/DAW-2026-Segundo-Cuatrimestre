import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "../entities/cliente.entity.js";
import { CreateClienteDto } from "../dtos/input/create-cliente.dto.js";
import { EstadosClientesEnum } from "../enums/estados-clientes.enum.js";
import { UpdateClienteDto } from "../dtos/input/update-cliente.dto.js";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { FindOptionsWhere, Repository } from "typeorm";
import { ListClienteDTO } from "../dtos/output/list-cliente.dto.js";
import { BadRequestException, forwardRef, Inject } from "@nestjs/common";
import type { ProyectosService } from "./proyectos.service.js";

@Injectable()
export class ClientesService {

    constructor(@InjectRepository(Cliente) private readonly repository: Repository<Cliente>,
        @Inject(forwardRef(() => "PROYECTOS_SERVICE")) private readonly proyectosService: ProyectosService) { }

    async crearCliente(dto: CreateClienteDto): Promise<{ id: number }> {

        const cliente: Cliente = this.repository.create(dto);
        cliente.estado = EstadosClientesEnum.ACTIVO;
        await this.repository.save(cliente);
        return { id: cliente.id };
    }

    async actualizarCliente(id: number, dto: UpdateClienteDto): Promise<void> {

        const cliente: Cliente | null = await this.repository.findOneBy({ id });

        if (!cliente) {
            throw new BadRequestException('Cliente no encontrado');
        }

        const relacionadoConProyectos: boolean = await this.proyectosService.existeProyectoPorIdCliente(id);

        if (relacionadoConProyectos && dto.estado === EstadosClientesEnum.BAJA) {
            throw new BadRequestException('No se puede dar de baja un cliente con proyectos relacionados');
        }

        this.repository.merge(cliente, dto);
        await this.repository.save(cliente);
    }

    async obtenerClientes(estado: EstadosClientesEnum): Promise<ListClienteDTO[]> {

        const whereCondition: FindOptionsWhere<ListClienteDTO> = {}

        if (estado){
            whereCondition.estado = estado
        }

        const clientes: Cliente[] = await this.repository.find({ select: { id: true, nombre: true, estado: true }, order: { id: 'ASC' }, where: whereCondition });

        const dtoList: ListClienteDTO[] = [];

        for (const c of clientes) {
            const dto = new ListClienteDTO();
            dto.id = c.id;
            dto.nombre = c.nombre;
            dto.estado = c.estado;
            dtoList.push(dto);
        }

        return dtoList;
    }

    async existeClienteActivoPorId(id: number): Promise<boolean> {

        const existe: boolean = await this.repository.exists({ where: { id, estado: EstadosClientesEnum.ACTIVO } });
        return existe;
    }
}
