import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HotelForm } from '../interfaces/hotel-form.interface';

const base_url = environment.base_url;
const controller = environment.controlerHotel;

@Injectable({
  providedIn: 'root'
})
export class HotelService {


  constructor(private http: HttpClient) { }

  saveHotel(hotel: HotelForm){
  
    return this.http.post(`${ base_url }/${ controller }/SaveHotel`, hotel);
  }

  listHotels(){
    return this.http.get(`${ base_url }/${ controller }/listHotels`);
  }

  selectHotel(id:number){
    return this.http.get(`${ base_url }/${ controller }/listHotelsById/${id}`);
  }

  editHotel(hotel: HotelForm){
    return this.http.put(`${ base_url }/${ controller }/UpdateHotel`, hotel);
  }

  disabledHotel(id: number){
    return this.http.put(`${ base_url }/${ controller }/disableHotel?id=${id}`, id);
  }
}
