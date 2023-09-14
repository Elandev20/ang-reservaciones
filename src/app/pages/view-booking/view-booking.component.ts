import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent {

  listBooking : any = [];
  bookingSelected : any = [];
  viewList : boolean = false;

  constructor(private bookingService : BookingService,private modalService : ModalService) {
    
  }

  ngOnInit(): void {
    this.bookingService.listBooking().subscribe(data => {
        this.listBooking = data;
        console.log(data);
        
    });
  }

  viewBookingSelected(id : number){
    this.bookingService.viewBooking(id).subscribe(data => {
      this.bookingSelected = data; 
      this.viewList = true;
    });
  }

  back(){
    this.viewList = false;
  }
}
