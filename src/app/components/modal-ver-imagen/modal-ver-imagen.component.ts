import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { urlImagen } from "../../../environments/environment";
@Component({
  selector: 'app-modal-ver-imagen',
  templateUrl: './modal-ver-imagen.component.html',
  styleUrls: ['./modal-ver-imagen.component.css']
})
export class ModalVerImagenComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalVerImagenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
 
  ) {
   }
    imagenVar="";
    comunidadVar="";

  ngOnInit() {
    this.imagenVar= urlImagen+this.data.imagen.RutaLogoComunidad;
    this.comunidadVar= this.data.imagen.NombreComunidad;
  }

}
