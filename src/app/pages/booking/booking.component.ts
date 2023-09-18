import { Component } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import '@angular/localize/init'
import { CiudadService } from 'src/app/services/ciudad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;
  listCity : any = [];
  formSearch: FormGroup;
  listHotelSearch : any;
  reserved : boolean = false;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private ciudadService : CiudadService
    ,private fb: FormBuilder, private hotelService : HotelService) {
    
    // this.fromDate = calendar.getToday();
		// this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.getCities();
    this.crearFormulario();
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

  getCities(){
    this.ciudadService.getCity().subscribe(data => {
      this.listCity = data;
     });
  }

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  crearFormulario(){
    this.formSearch = this.fb.group({
      fInicio: new FormControl("",Validators.required),
      fFin: new FormControl("",Validators.required),
      ciudadId: new FormControl("",Validators.required),
    })
}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  searchHotel(){
    this.hotelService.searchHotelByCity(this.formSearch.controls['ciudadId'].value).subscribe(data => {
      this.listHotelSearch = data
      if (this.listHotelSearch.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'No se encontraron resultados',
        })
      }
      
    })
  }

  reservedHotel(id : number){
    if (this.fromDate == null || this.toDate == null) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor selecciona las fechas de la reserva',
      })
    }
    else {
      
      this.reserved = true;
    }
  }

  back(){
    this.reserved = false;
  }
}
