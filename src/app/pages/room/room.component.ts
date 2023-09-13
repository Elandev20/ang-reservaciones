import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomForm } from 'src/app/interfaces/room-form.interface';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  formRoom: FormGroup;
  disable : boolean = false;
  public listRooms: any;
  public listTypeRooms : any;
  enabledNewRoom : boolean = false;
  Room: any;
  
  @Input() data : number;

  
  constructor(private fb: FormBuilder, private roomService : RoomService) {
    
  }

  ngOnInit(): void {
  this.crearFormulario();
    this.getListRooms(this.data);
    this.getListTypeRooms();
  }

  getListRooms(id: number){
    debugger
    this.roomService.listRooms(id).subscribe(data => {
      this.listRooms = data;
      
    })
  }

  getListTypeRooms(){
    this.roomService.listTypeRoom().subscribe(data => {
      this.listTypeRooms = data;
    })
  }

  crearFormulario(){
    this.formRoom = this.fb.group({
      habitacionId: new FormControl(0),
      hotelId: new FormControl(this.data),
      descripcion: new FormControl('',Validators.required),
      tipoHabitacionId: new FormControl("",Validators.required),
      impuesto: new FormControl("", Validators.required),
      precioHabitacion: new FormControl("", Validators.required),
      activo: new FormControl(0, Validators.required),
      numeroHabitacion: new FormControl("", Validators.required),
    })
}

saveRoom(){
  if (this.Room == null) {
    if (this.formRoom.invalid) {
      return Object.values(this.formRoom.controls).forEach( controls => {
        controls.markAllAsTouched();
      })
    }
  this.savedData(this.formRoom.value)
    this.crearFormulario();
  }
  else{
    if (this.formRoom.invalid) {
      return Object.values(this.formRoom.controls).forEach( controls => {
        controls.markAllAsTouched();
      })
    }
    this.updateData(this.formRoom.value);
    this.crearFormulario();
  }
}

savedData(form : RoomForm){
  this.roomService.saveRoom(form).subscribe(data => {
    Swal.fire({
      icon: 'success',
      text: 'Datos Guardados exitosamente',
    })
    this.getListRooms(this.data);
    this.enabledNewRoom = false;
  }, (err) => {
    Swal.fire({
      icon: 'error',
      title: 'Error al momento de almacenar la información',
      text: err,
    })
  })
}

updateData(form : RoomForm){
  this.roomService.updateRoom(form).subscribe(data => {
    Swal.fire({
      icon: 'success',
      text: 'Datos Guardados exitosamente',
    })
    this.getListRooms(this.data);
    this.enabledNewRoom = false;
  }, (err) => {
    Swal.fire({
      icon: 'error',
      title: 'Error al momento de modificar la información',
      text: err,
    })
  })
}

get descripcionNoValida() {
  return this.formRoom.get('descripcion')?.errors && this.formRoom.get('descripcion')?.touched
}

get tipoHabitacionNoValida() {
  return this.formRoom.get('tipoHabitacionId')?.errors && this.formRoom.get('tipoHabitacionId')?.touched
}

get impuestoNoValida() {
  return this.formRoom.get('impuesto')?.errors && this.formRoom.get('impuesto')?.touched
}

get precioNoValido() {
  return this.formRoom.get('precioHabitacion')?.errors && this.formRoom.get('precioHabitacion')?.touched
}

get numeroHabitacionNoValido() {
  return this.formRoom.get('numeroHabitacion')?.errors && this.formRoom.get('numeroHabitacion')?.touched
}

newRoom(){
  this.enabledNewRoom = true;
  this.Room = null;
  this.RoomNew();
}

RoomNew(){
  this.formRoom.controls['descripcion'].setValue("");
  this.formRoom.controls['tipoHabitacionId'].setValue("");
  this.formRoom.controls['impuesto'].setValue("");
  this.formRoom.controls['precioHabitacion'].setValue("");
  this.formRoom.controls['numeroHabitacion'].setValue("");
}

back(){
  this.enabledNewRoom = false;
}

viewDetailRoom(id: number){
  debugger
  this.roomService.listRoomsById(id).subscribe(data => {
    this.Room = data;
    this.setValues(this.Room);
  });
  this.enabledNewRoom = true;
}

setValues(data:any){
  this.formRoom.controls['habitacionId'].setValue(data.habitacionId);
    this.formRoom.controls['hotelId'].setValue(data.hotelId);
    this.formRoom.controls['descripcion'].setValue(data.descripcion);
    this.formRoom.controls['tipoHabitacionId'].setValue(data.tipoHabitacionId);
    this.formRoom.controls['impuesto'].setValue(data.impuesto);
    this.formRoom.controls['precioHabitacion'].setValue(data.precioHabitacion);
    this.formRoom.controls['activo'].setValue(data.activo);
    this.formRoom.controls['numeroHabitacion'].setValue(data.numeroHabitacion);
    this.formRoom.controls['activo'].setValue(data.activo);
}

}
