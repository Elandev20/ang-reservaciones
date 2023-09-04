import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent {



  constructor(private modalService : ModalService) {
  }

  newHotel(){
    this.modalService.abrirModal();
  }
}
