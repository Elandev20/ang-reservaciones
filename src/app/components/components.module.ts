import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHotelComponent } from './modal-hotel/modal-hotel.component';



@NgModule({
  declarations: [
  
    ModalHotelComponent
  ],
  exports: [
    ModalHotelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
