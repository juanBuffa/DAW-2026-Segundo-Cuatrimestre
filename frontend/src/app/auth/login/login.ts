import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { LoginApiClient } from "./login-api-client";
import { AuthStore } from "../auth-store";
import { Router } from "@angular/router";
import { Button } from "primeng/button";
import { Password } from "primeng/password";
import { InputText } from "primeng/inputtext";

@Component({
    selector: "app-login",
    templateUrl: "./login.html",
    styleUrl: "./login.css",
    imports: [ReactiveFormsModule, InputText, Password, Button]
})
export class Login {

    private readonly messageService: MessageService = inject(MessageService)

    private readonly loginApiClient: LoginApiClient = inject(LoginApiClient);

    private readonly authStore: AuthStore = inject(AuthStore);

    private readonly router: Router = inject(Router)

    form: FormGroup = new FormGroup({
        nombre: new FormControl(null, Validators.required),
        clave: new FormControl(null, Validators.required)
    });

    iniciarSesion() {

        if (!this.form.valid) {
            this.messageService.add({ severity: "error", summary: "Es necesario completar todos los campos del formulario para avanzar" })
            return
        }

        const nombre: string = this.form.value.nombre;

        const clave: string = this.form.value.clave;

        this.loginApiClient.iniciarSesion(nombre, clave).subscribe({
            next: (res)=>{
                this.authStore.guardarToken(res.accessToken);
                this.router.navigateByUrl("/proyectos");
            },
            error: (err)=>{
                this.messageService.add({severity: "error", summary: "Ha ocurrido un error al iniciar sesión. Verifique las credenciales ingresadas"})
            }
        });

    }

}