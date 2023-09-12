import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoomForm } from '../interfaces/room-form.interface';


const base_url = environment.base_url;
const controller = environment.controlerRoom;


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  listRooms(id: number){
    return this.http.get(`${ base_url }/${ controller }/listRoomsByHotel/${id}`);
  }

  listTypeRoom(){
    return this.http.get(`${ base_url }/${ controller }/ListTypeRoom`);
  }

  saveRoom(room: RoomForm){
  
    return this.http.post(`${ base_url }/${ controller }/SaveRoom`, room);
  }
}
