import { Body, Controller, NotImplementedException, Post } from "@nestjs/common";
import { LoginDTO } from "../dtos/input/login.dto.js";
import { AuthService } from "../services/auth.service.js";

@Controller("/auth")
export class LoginController {

    constructor(private readonly service: AuthService) { }

    @Post()
    async login(@Body() dto: LoginDTO): Promise<{ accessToken: string }> {
        return await this.service.login(dto);
    }

}