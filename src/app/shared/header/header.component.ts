import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(  ) {
    this.usuario = "";
  }

  logout() {
    
  }


}
