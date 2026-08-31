import { Module } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller.js";

@Module({
    imports: [],
    controllers: [LoginController],
    providers: [],
    exports: []
})
export class AuthModule {

}