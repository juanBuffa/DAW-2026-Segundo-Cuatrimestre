import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity.js";
import { EstadosUsuariosEnum } from "../enums/estados-usuarios.enum.js";

@Injectable()
export class UsuariosService {

    constructor(@InjectRepository(Usuario) private readonly repository: Repository<Usuario>) {

    }

    async buscarUsuarioActivoPorNombre(nombre: string): Promise<Usuario | null> {

        return await this.repository.findOne({ where: { nombre, estado: EstadosUsuariosEnum.ACTIVO } })
    }

}