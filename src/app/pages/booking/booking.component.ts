import { Component } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import '@angular/localize/init'
import { CiudadService } from 'src/app/services/ciudad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import Swal from 'sweetalert2';
import { filter } from 'src/app/interfaces/filter.interface';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { booking } from 'src/app/interfaces/booking.interface';
import { Pasajero } from 'src/app/interfaces/passenger.interface';

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
  iDHotel : number;
  dateInicio : string;
  dateFin : string;
  listRoomToReserve : any;
  GoToBooking : boolean = false;
  formBooking: FormGroup;
  disable: boolean = false;
  listGender : any;
  listTypeDoc : any;
  IDHabitacion: number;
  hotelfinded : boolean = false;



  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private ciudadService : CiudadService
    ,private fb: FormBuilder, private hotelService : HotelService, private bookingService : BookingService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.crearFormulario();
    
    this.getCities();
    this.getGender();
    this.getTypeDoc();

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

  getGender(){
    this.userService.listGender().subscribe( data => {
      this.listGender = data;
    })
  }

  getTypeDoc(){
    this.userService.listTypeDoc().subscribe( data => {
      this.listTypeDoc = data;
    })
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
      maxPersonas: new FormControl("",Validators.required),
    })
}

crearFormularioReserva(){
  this.formBooking = this.fb.group({
    hotelId: new FormControl(this.iDHotel),
    habitacionId: new FormControl(this.IDHabitacion),
    pasajeroId: new FormControl("",Validators.required),
    nombreEmergencia: new FormControl("",Validators.required),
    telefonoEmergencia: new FormControl("",Validators.required),
    nombre: new FormControl("",Validators.required),
    genero: new FormControl("",Validators.required),
    tipoDocumentoId: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    telefono: new FormControl("",Validators.required),

  })
}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  searchHotel(){
    this.hotelService.searchHotelByCity(this.formSearch.controls['ciudadId'].value).subscribe(data => {
      this.hotelfinded = true;
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
    this.iDHotel = id;
    if (this.fromDate == null || this.toDate == null || this.formSearch.controls['maxPersonas'].value == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Por favor selecciona las fechas de la reserva y/o cantidad de personas',
      })
    }
    else {
      this.dateInicio =new Date(this.dateInicio = this.convertDate(this.fromDate)).toLocaleDateString('en-CA');
      this.dateFin = new Date(this.dateFin = this.convertDate(this.toDate)).toLocaleDateString('en-CA') ;
      let filterRoom : filter = {
          hotelId : id,
          fInicio : this.dateInicio,
          fFin : this.dateFin,
          maxPersonas : this.formSearch.controls['maxPersonas'].value
      }
      this.bookingService.listRoomFree(filterRoom).subscribe( data => {
        this.listRoomToReserve = data;
        if (this.listRoomToReserve.length == 0) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No hay habitaciones para el criterio de busqueda',
          })
        }
        
      })
      this.reserved = true;
      
      
    }
  }

  back(){
    this.reserved = false;
  }

  convertDate(date : NgbDate){
    return `${date.year}-${date.month}-${date.day}`
  }

booking(id: number){
  this.IDHabitacion = id;
  this.reserved = false;
  this.GoToBooking = true;
  this.crearFormularioReserva();
}

backToRooms(){
  this.reserved = true;
  this.GoToBooking = false;
}

enviar(){
  if (this.formBooking.invalid) {
    return Object.values(this.formBooking.controls).forEach( controls => {
      controls.markAllAsTouched();
    })
  }

  let passenger : Pasajero = {
    cedula : this.formBooking.controls['pasajeroId'].value,
    nombre : this.formBooking.controls['nombre'].value,
    generoId : this.formBooking.controls['genero'].value,
    tipoDocumentoId : this.formBooking.controls['tipoDocumentoId'].value,
    email : this.formBooking.controls['email'].value,
    telefono : this.formBooking.controls['telefono'].value
  }
  
  
  let sendData : booking = {
    hotelId : this.iDHotel,
    pasajeroId : this.formBooking.controls['pasajeroId'].value,
    fInicio : this.dateInicio,
    fFin : this.dateFin,
    habitacionId : this.IDHabitacion,
    nombreEmergencia : this.formBooking.controls['nombreEmergencia'].value,
    telefonoEmergencia : this.formBooking.controls['telefonoEmergencia'].value,
    Pasajero : passenger
  }

  this.bookingService.saveBooking(sendData).subscribe (data => {
    Swal.fire({
      icon: 'success',
      text: 'Reserva realizada con exito',
    })
    this.reserved = false;
    this.GoToBooking = false;
  }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Surgio un error, intente nuevamente',
      })
    })
  
}

get documentoNoValida() {
  return this.formBooking.get('pasajeroId')?.errors && this.formBooking.get('pasajeroId')?.touched
}

get typeDocumentoNoValida() {
  return this.formBooking.get('tipoDocumentoId')?.errors && this.formBooking.get('tipoDocumentoId')?.touched
}

get typeGenderNoValida() {
  return this.formBooking.get('genero')?.errors && this.formBooking.get('genero')?.touched
}

get nombreNoValida() {
  return this.formBooking.get('nombre')?.errors && this.formBooking.get('nombre')?.touched
}

get emailNoValida() {
  return this.formBooking.get('email')?.errors && this.formBooking.get('email')?.touched
}

get telefonoNoValida() {
  return this.formBooking.get('telefono')?.errors && this.formBooking.get('telefono')?.touched
}

get nombreEmerNoValida() {
  return this.formBooking.get('nombreEmergencia')?.errors && this.formBooking.get('nombreEmergencia')?.touched
}

get telefonoEmerNoValida() {
  return this.formBooking.get('telefonoEmergencia')?.errors && this.formBooking.get('telefonoEmergencia')?.touched
}
}
