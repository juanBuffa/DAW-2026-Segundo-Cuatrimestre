import { Component, inject } from "@angular/core";
import { AuthStore } from "../auth/auth-store";
import { Button } from "primeng/button";

@Component({
    selector: "app-template",
    templateUrl: "./template.html",
    styleUrl: "./template.css",
    imports: [Button]
})
export class Template{


    private readonly authStore: AuthStore = inject(AuthStore)

    cerrarSesion(){
        this.authStore.cerrarSesion();
    }

}