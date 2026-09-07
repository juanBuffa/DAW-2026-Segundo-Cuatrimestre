import { Module } from "@nestjs/common";
import { ClientesController } from "./controllers/clientes.controller.js";
import { TareasController } from "./controllers/tareas.controller.js";
import { ProyectosController } from "./controllers/proyectos.controller.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Proyecto } from "./entities/proyecto.entity.js";
import { Cliente } from "./entities/cliente.entity.js";
import { Tarea } from "./entities/tarea.entity.js";

@Module({
    imports: [TypeOrmModule.forFeature([Tarea, Cliente, Proyecto])],
    controllers: [ClientesController, TareasController, ProyectosController],
    providers: [],
    exports: []
})
export class GestionModule{

}