import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "../dtos/input/login.dto.js";
import { UsuariosService } from "./usuarios.service.js";

@Injectable()
export class AuthService {

    constructor(private readonly usuariosService: UsuariosService,
        private jwtService: JwtService) { }

    async login(dto: LoginDTO): Promise<{ accessToken: string }> {

        const usuario = await this.usuariosService.buscarUsuarioActivoPorNombre(dto.nombre);

        if (!usuario) {
            throw new UnauthorizedException("Usuario no encontrado");
        }

        if (!bcrypt.compareSync(dto.clave, usuario.clave)) {
            throw new UnauthorizedException();
        }

        const payload = { nombre: usuario.nombre, sub: usuario.id };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}