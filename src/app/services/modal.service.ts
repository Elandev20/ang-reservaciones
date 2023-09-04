import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarmodal: boolean = true;

  get ocultarModal(){
    return this._ocultarmodal;
  }

  abrirModal(){
    this._ocultarmodal = false;
  }

  cerrarModal(){
    this._ocultarmodal = true;
  }

  constructor() { }
}
