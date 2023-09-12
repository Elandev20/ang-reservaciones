import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  public listHotels : any = [];
  public Hotel : any;
  public editando : boolean = true;
  public nuevo : boolean = true;
  formHotel: FormGroup;
  listCity : any = [];
  public selectedFile : File;
  disable : boolean;
  textNewHotel : boolean = false;
  idHotel : number
  
  constructor(private modalService : ModalService, private hotelService : HotelService, 
    private fb: FormBuilder,public ciudadService : CiudadService) {
    this.crearFormulario();
  }


  viewHotels(){
    this.hotelService.listHotels().subscribe(data => {
      this.listHotels = data;
      
      
    })
  }

  crearFormulario(){
    this.formHotel = this.fb.group({
      nombre: new FormControl(),
      activo: new FormControl(),
      ciudadId: new FormControl(),
      imagen: new FormControl(),
      hotelId: new FormControl(0),
    })
}

  ngOnInit(): void {
  
  this.viewHotels();
  this.disable = false;
  this.getCities();
  }

  getCities(){
    this.ciudadService.getCity().subscribe(data => {
      this.listCity = data;
     });
  }

  onFileSelected(event: any){
    this.selectedFile = <File> event.target.files[0];
  }

  newHotel(){
    this.nuevo = false;
    this.formHotel.controls['nombre'].setValue('');
    this.formHotel.controls['ciudadId'].setValue(0);
    this.formHotel.controls['activo'].setValue(true);
    this.formHotel.controls['hotelId'].setValue(0);
    this.textNewHotel = true;
  }

  editHotel(id: number){
    this.hotelService.selectHotel(id).subscribe(data => {
      this.textNewHotel = false;
      this.Hotel = data;
      this.nuevo = false;
      this.setValuesHotel();

    })
  }

  setValuesHotel(){
    this.formHotel.controls['nombre'].setValue(this.Hotel.nombre);
    this.formHotel.controls['ciudadId'].setValue(this.Hotel.ciudadId);
    this.formHotel.controls['activo'].setValue(this.Hotel.activo);
    this.formHotel.controls['hotelId'].setValue(this.Hotel.hotelId);
  }

  disabledHotel(id: number){
    this.hotelService.disabledHotel(id).subscribe(data => {
      this.viewHotels();
      Swal.fire({
        icon: 'success',
        text: 'Actualización realizada con exito',
        
      })
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Surgio un error, intente nuevamente',
      })
    })
  }

  editRooms(id: number){
    this.editando = false;
    this.idHotel = id;
  }

  back(){
    this.editando = true;
    this.nuevo = true;
  }

  new(){
    this.editando = true;
    this.nuevo = true;
  }

  setIconColor(state : boolean){
    debugger
    if (state) {
      return 'button-on'
    }
    else{
      return 'button-off'
    }
  }

  saveHotel(){
  if (this.Hotel == null) {
    this.hotelService.saveHotel(this.formHotel.value).subscribe(data => {
      Swal.fire({
        icon: 'success',
        text: 'Datos Guardados exitosamente',
      })
      this.viewHotels();
      this.back();
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al momento de almacenar la información',
        text: err,
      })
    })
  }
  else{
    debugger
    this.hotelService.editHotel(this.formHotel.value).subscribe(data => {
      Swal.fire({
        icon: 'success',
        text: 'Datos Guardados exitosamente',
      })
      this.viewHotels();
      this.back();
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al momento de modificar la información',
        text: err,
      })
    })
  }
}
}
