import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBoookingComponent } from './modal-hotel/modal-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalBoookingComponent
  ],
  exports: [
    ModalBoookingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
