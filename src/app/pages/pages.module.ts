import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BookingComponent } from './booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { ComponentsModule } from '../components/components.module';
import { RoomComponent } from './room/room.component';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    BookingComponent,
    DashboardComponent,
    PagesComponent,
    HotelComponent,
    ViewBookingComponent,
    RoomComponent,
  ],
  exports: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    NgbDatepickerModule,
    JsonPipe,
    NgbAlertModule
  ]
})
export class PagesModule { }
