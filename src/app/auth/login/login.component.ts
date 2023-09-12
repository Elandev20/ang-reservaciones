import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;
  forma: FormGroup;
  userLogin: any;


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: LoginService,
               private toastr: ToastrService) {
                this.crearFormulario();
                }

  ngOnInit(): void {
  }

crearFormulario(){
  this.forma = this.fb.group({
    usuario: new FormControl(),
    contrasena: new FormControl(),
  })
}
  login() {

    this.usuarioService.login(this.forma.value).subscribe(data=> {
      this.userLogin = data;
      if (this.userLogin) {
        localStorage.setItem('user', this.userLogin.usuario );
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
        })
        this.router.navigateByUrl('/');
      }
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña invalido',
      })
    })

  }
  
  

  async startApp() {
    
    
    
  };

  

}
