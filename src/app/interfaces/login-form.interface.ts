import { FormControl } from "@angular/forms";


export interface LoginForm {
    usuario: FormControl<string>;
    contrasena: FormControl<string>;
    perfil: FormControl<string>;
}