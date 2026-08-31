import { Body, Controller, NotImplementedException, Post } from "@nestjs/common";
import { LoginDTO } from "../dtos/input/login.dto.js";

@Controller("/auth")
export class LoginController {

    constructor() { }

    @Post()
    async login(@Body() dto: LoginDTO): Promise<{ accessToken: string }> {
        throw new NotImplementedException();
    }

}