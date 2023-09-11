import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHotelComponent } from './modal-hotel/modal-hotel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  
    ModalHotelComponent
  ],
  exports: [
    ModalHotelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
