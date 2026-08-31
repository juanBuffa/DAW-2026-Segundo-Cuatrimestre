import { Module } from "@nestjs/common";
import { ClientesController } from "./controllers/clientes.controller.js";
import { TareasController } from "./controllers/tareas.controller.js";
import { ProyectosController } from "./controllers/proyectos.controller.js";

@Module({
    imports: [],
    controllers: [ClientesController, TareasController, ProyectosController],
    providers: [],
    exports: []
})
export class GestionModule{

}