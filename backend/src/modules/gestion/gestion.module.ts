import { Module } from "@nestjs/common";
import { ClientesController } from "./controllers/clientes.controller.js";
import { TareasController } from "./controllers/tareas.controller.js";
import { ProyectosController } from "./controllers/proyectos.controller.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Proyecto } from "./entities/proyecto.entity.js";
import { Cliente } from "./entities/cliente.entity.js";
import { Tarea } from "./entities/tarea.entity.js";
import { TareasService } from "./services/tareas.service.js";
import { ProyectosService } from "./services/proyectos.service.js";
import { ClientesService } from "./services/clientes.service.js";
import { AuthModule } from "../auth/auth.module.js";

@Module({
    imports: [TypeOrmModule.forFeature([Tarea, Cliente, Proyecto]), AuthModule],
    controllers: [ClientesController, TareasController, ProyectosController],
    providers: [TareasService,
        ProyectosService,
        ClientesService,
        {
            provide: "PROYECTOS_SERVICE",
            useExisting: ProyectosService
        }, {
            provide: "CLIENTES_SERVICE",
            useExisting: ClientesService
        }],
    exports: []
})
export class GestionModule {

}