import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: any;

  constructor( private router: Router  ) {
    this.usuario = "";
  }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('user');
    
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }


}
