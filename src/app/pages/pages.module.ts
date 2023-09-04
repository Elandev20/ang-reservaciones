import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BookingComponent } from './booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    BookingComponent,
    DashboardComponent,
    PagesComponent,
    HotelComponent,
    ViewBookingComponent,
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
