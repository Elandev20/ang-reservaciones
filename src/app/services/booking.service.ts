import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { filter } from '../interfaces/filter.interface';
import { booking } from '../interfaces/booking.interface';

const base_url = environment.base_url;
const controller = environment.controlerBooking;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  listBooking(){
    return this.http.get(`${ base_url }/${ controller }/ListBooking`);
  }

  viewBooking(id:number){
    return this.http.get(`${ base_url }/${ controller }/ListBookingById/${id}`);
  }

  listRoomFree(filter : filter){
    return this.http.post(`${ base_url }/${ controller }/getRoomByHotel`, filter);
  }

  saveBooking(data : booking){
    return this.http.post(`${ base_url }/${ controller }/SaveBooking`, data);
  }
}
