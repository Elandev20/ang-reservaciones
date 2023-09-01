import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LoginForm } from 'src/app/interfaces/login-form.interface';

const base_url = environment.base_url;
const controller = environment.controllerUser;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http: HttpClient, 
    private router: Router,) { }


    login( formData: LoginForm ) {
      return this.http.post(`${ base_url }/${controller}/Login`, formData );
    }
}
