import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadService } from 'src/app/services/ciudad.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-booking',
  templateUrl: './modal-booking.component.html',
  styleUrls: ['./modal-booking.component.css']
})
export class ModalBoookingComponent {

  @Input() data : any;

  public selectedFile : File;
  forma: FormGroup;
  newForma : FormGroup;
  listCity : any;
  disable : boolean;
  
  constructor(public modalService: ModalService, private http: HttpClient, 
    private fb: FormBuilder, public ciudadService : CiudadService,
    public hotelService : HotelService, private router: Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  this.disable = false;
  this.listCity = this.data;
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

  onFileSelected(event: any){
    this.selectedFile = <File> event.target.files[0];
  }

  crearFormulario(){
      this.forma = this.fb.group({
        nombre: new FormControl(),
        activo: new FormControl(),
        ciudadId: new FormControl(),
        imagen: new FormControl(),
        hotelId: new FormControl(0),
      })
  }

  ngOnChanges(): void {
    this.forma.controls['nombre'].setValue(this.data.nombre);
    this.forma.controls['ciudadId'].setValue(this.data.ciudadId);
    this.forma.controls['activo'].setValue(this.data.activo);
    this.forma.controls['hotelId'].setValue(this.data.hotelId);
    
  }
  

  saveHotel(){
  if (this.data == null) {
    this.hotelService.saveHotel(this.forma.value).subscribe(data => {
    
      this.modalService.cerrarModal();
      this.router.navigateByUrl('/dashboard/hoteles');
      
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al momento de almacenar la información',
        text: err,
      })
    })
  }
  else{
    this.hotelService.editHotel(this.forma.value).subscribe(data => {
    
      this.modalService.cerrarModal();
      this.router.navigateByUrl('/dashboard/hoteles');
      
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
