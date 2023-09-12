import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      descripcion: new FormControl(),
      tipoHabitacionId: new FormControl(),
      impuesto: new FormControl(0),
      precioHabitacion: new FormControl(0),
      activo: new FormControl(0),
      numeroHabitacion: new FormControl(0),
    })
}

saveRoom(){
  debugger
  if (this.Room == null) {
    this.roomService.saveRoom(this.formRoom.value).subscribe(data => {
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
  else{
    // debugger
    // this.roomService.editHotel(this.formHotel.value).subscribe(data => {
    //   Swal.fire({
    //     icon: 'success',
    //     text: 'Datos Guardados exitosamente',
    //   })
    //   this.viewHotels();
    //   this.back();
    // }, (err) => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error al momento de modificar la información',
    //     text: err,
    //   })
    // })
  }
}

newRoom(){
  this.enabledNewRoom = true;
}

back(){
  this.enabledNewRoom = false;
}
}
