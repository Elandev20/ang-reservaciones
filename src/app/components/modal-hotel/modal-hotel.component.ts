import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-hotel',
  templateUrl: './modal-hotel.component.html',
  styleUrls: ['./modal-hotel.component.css']
})
export class ModalHotelComponent {

  constructor(public modalService: ModalService) {}

  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
