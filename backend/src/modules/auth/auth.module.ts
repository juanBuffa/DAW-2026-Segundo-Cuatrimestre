import { Module } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity.js";
import { UsuariosService } from "./services/usuarios.service.js";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./services/auth.service.js";
import { AuthGuard } from "./guards/auth.guard.js";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
        inject: [ConfigService],
        global: true,
        useFactory: (configService: ConfigService) => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '8h' },
        }),
    }),
    ],
    controllers: [LoginController],
    providers: [UsuariosService, AuthService, AuthGuard],
    exports: [AuthGuard]
})
export class AuthModule {

}