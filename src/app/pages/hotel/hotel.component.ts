import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  public listHotels : any = [];
  public Hotel : any;

  constructor(private modalService : ModalService, private hotelService : HotelService) {
  }


  viewHotels(){
    this.hotelService.listHotels().subscribe(data => {
      this.listHotels = data;
      
      
    })
  }

  ngOnInit(): void {
  
  this.viewHotels();
    
  }

  ngOnChanges(): void {
    console.log("aca");
    
  }

  newHotel(){
    this.modalService.abrirModal();
  }

  editHotel(id: number){
    this.hotelService.selectHotel(id).subscribe(data => {
      this.Hotel = data;
      this.modalService.abrirModal();
    })
  }
}
