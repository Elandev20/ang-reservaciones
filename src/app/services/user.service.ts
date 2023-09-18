import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
const controller = environment.controllerUser;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  listGender(){
    return this.http.get(`${ base_url }/${ controller }/getGender`);
  }

  listTypeDoc(){
    return this.http.get(`${ base_url }/${ controller }/getTypeDoc`);
  }
}
